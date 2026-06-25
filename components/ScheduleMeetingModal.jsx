"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CalendarCheck, Loader2, Calendar, Clock, ChevronDown } from "lucide-react";

export default function ScheduleMeetingModal({ isOpen, onClose }) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        date: "",
        time: "",
        topic: "",
    });
    
    const [status, setStatus] = useState("idle"); // idle, loading, success, error
    const [errorMessage, setErrorMessage] = useState("");

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
            // Optional: reset form after close
            setTimeout(() => {
                if(status === "success") {
                    setStatus("idle");
                    setFormData({ name: "", email: "", date: "", time: "", topic: "" });
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
            const res = await fetch("/api/schedule-meeting", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (res.ok && data.success) {
                setStatus("success");
            } else {
                setStatus("error");
                setErrorMessage(data.message || "Failed to schedule meeting.");
            }
        } catch {
            setStatus("error");
            setErrorMessage("An unexpected error occurred. Please try again.");
        }
    };

    // Get today's date for minimum date attribute
    const today = new Date().toISOString().split('T')[0];

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
                        <div className="absolute top-0 inset-x-0 h-[200px] bg-gradient-to-b from-purple-500/10 to-transparent dark:from-purple-500/20 dark:to-transparent pointer-events-none" />
                        
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
                                    <div className="w-20 h-20 bg-green-50 dark:bg-green-500/10 rounded-full flex items-center justify-center mb-6 border border-green-200 dark:border-green-500/20">
                                        <CalendarCheck className="w-10 h-10 text-green-500 dark:text-green-400" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Meeting Requested!</h3>
                                    <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-sm">
                                        Your consultation has been requested for {formData.date} at {formData.time}. We will send a calendar invite to your email shortly.
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
                                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Schedule Consultation</h2>
                                        <p className="text-slate-600 dark:text-slate-400 text-sm">Pick a preferred date and time, and our tech experts will reach out to confirm.</p>
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
                                                    className="w-full px-4 py-3 bg-slate-50 dark:bg-[#020617] border border-slate-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 outline-none transition-all dark:text-white placeholder:text-slate-400 text-sm"
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
                                                    className="w-full px-4 py-3 bg-slate-50 dark:bg-[#020617] border border-slate-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 outline-none transition-all dark:text-white placeholder:text-slate-400 text-sm"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                            <div className="space-y-1.5 relative">
                                                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Preferred Date</label>
                                                <div className="relative">
                                                    <input 
                                                        type="date" 
                                                        name="date"
                                                        required
                                                        min={today}
                                                        value={formData.date}
                                                        onChange={handleChange}
                                                        className="w-full px-4 py-3 pl-11 bg-slate-50 dark:bg-[#020617] border border-slate-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 outline-none transition-all dark:text-white text-sm"
                                                    />
                                                    <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400">
                                                        <Calendar className="w-4 h-4" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="space-y-1.5 relative">
                                                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Preferred Time</label>
                                                <div className="relative">
                                                    <input 
                                                        type="time" 
                                                        name="time"
                                                        required
                                                        value={formData.time}
                                                        onChange={handleChange}
                                                        className="w-full px-4 py-3 pl-11 bg-slate-50 dark:bg-[#020617] border border-slate-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 outline-none transition-all dark:text-white text-sm"
                                                    />
                                                    <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400">
                                                        <Clock className="w-4 h-4" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-1.5 relative">
                                            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Meeting Topic / Agenda</label>
                                            <div className="relative">
                                                <select 
                                                    name="topic"
                                                    required
                                                    value={formData.topic}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-3 bg-slate-50 dark:bg-[#020617] border border-slate-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 outline-none transition-all dark:text-white appearance-none text-sm cursor-pointer"
                                                >
                                                    <option value="" disabled className="text-slate-400">Select an option...</option>
                                                    <option value="General Inquiry">General Inquiry</option>
                                                    <option value="New Project Discussion">New Project Discussion</option>
                                                    <option value="Cloud Infrastructure">Cloud Infrastructure</option>
                                                    <option value="AI Integration">AI Integration</option>
                                                    <option value="Technical Audit">Technical Audit</option>
                                                </select>
                                                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-500">
                                                    <ChevronDown className="w-4 h-4" />
                                                </div>
                                            </div>
                                        </div>

                                        {status === "error" && (
                                            <div className="p-3 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-400 text-sm rounded-lg">
                                                {errorMessage}
                                            </div>
                                        )}

                                        <button 
                                            type="submit"
                                            disabled={status === "loading"}
                                            className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl font-semibold transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-purple-500/20"
                                        >
                                            {status === "loading" ? (
                                                <>
                                                    <Loader2 className="w-5 h-5 animate-spin" />
                                                    Processing...
                                                </>
                                            ) : (
                                                <>
                                                    Request Meeting
                                                    <CalendarCheck className="w-4 h-4 ml-1" />
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
