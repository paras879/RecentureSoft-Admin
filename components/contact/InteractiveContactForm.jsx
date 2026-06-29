"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function InteractiveContactForm() {
    const [formStatus, setFormStatus] = useState("idle"); // idle, submitting, success
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormStatus("submitting");
        setError(null);

        const formData = new FormData(e.currentTarget);
        const firstName = formData.get("firstName") || "";
        const lastName = formData.get("lastName") || "";
        const email = formData.get("email") || "";
        const message = formData.get("message") || "";

        const name = `${firstName} ${lastName}`.trim();
        const subject = `Recenture Inquiry from ${name}`;

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email, subject, message }),
            });

            const data = await res.json();

            if (res.ok && data.success) {
                setFormStatus("success");
                e.target.reset();
                setTimeout(() => {
                    setFormStatus("idle");
                }, 3000);
            } else {
                setError(data.message || "Failed to send message. Please try again.");
                setFormStatus("idle");
            }
        } catch (err) {
            console.error("Form submit error:", err);
            setError("Network error. Please check your connection and try again.");
            setFormStatus("idle");
        }
    };

    return (
        <section className="py-10 md:py-16 lg:py-24 bg-slate-50 dark:bg-[#020617] relative transition-colors duration-300">
            <div className="container mx-auto px-4 max-w-[1200px]">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16">

                    {/* Contact Info */}
                    <div>
                        <h2 className="text-[clamp(2rem,8vw,3.5rem)] font-extrabold text-slate-900 dark:text-white leading-tight mb-6">
                            Let's build something <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">extraordinary.</span>
                        </h2>
                        <p className="text-slate-600 dark:text-gray-400 text-base md:text-lg mb-8 md:mb-12 max-w-md font-light">
                            Whether you need a full-scale enterprise transformation or a cutting-edge web application, our team is ready to architect your success.
                        </p>

                        <div className="space-y-5 md:space-y-8">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0">
                                    <svg className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="text-slate-900 dark:text-white font-semibold mb-1">Call Us</h4>
                                    <p className="text-slate-600 dark:text-gray-400 font-light">+91 777 000 3288</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shrink-0">
                                    <svg className="w-5 h-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="text-slate-900 dark:text-white font-semibold mb-1">Email Us</h4>
                                    <p className="text-slate-600 dark:text-gray-400 font-light">info@recenturesoft.com</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
                                    <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.242-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="text-slate-900 dark:text-white font-semibold mb-1">Global HQ</h4>
                                    <p className="text-slate-600 dark:text-gray-400 font-light">A-125, Sector-63,<br />Noida, UP 201301</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* The Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 rounded-[2.5rem] p-5 md:p-8 lg:p-12 backdrop-blur-xl relative overflow-hidden shadow-sm dark:shadow-none"
                    >
                        {formStatus === "success" ? (
                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/90 dark:bg-[#020617]/80 backdrop-blur-sm z-20">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="w-20 h-20 bg-emerald-50 dark:bg-emerald-500/20 rounded-full flex items-center justify-center border border-emerald-500/50 mb-6"
                                >
                                    <svg className="w-10 h-10 text-emerald-500 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </motion.div>
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Message Sent</h3>
                                <p className="text-slate-600 dark:text-gray-400 text-center">We'll get back to you within 24 hours.</p>
                            </div>
                        ) : null}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-slate-600 dark:text-gray-400 mb-2">First Name</label>
                                    <input required type="text" name="firstName" className="w-full bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 transition-colors" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-600 dark:text-gray-400 mb-2">Last Name</label>
                                    <input required type="text" name="lastName" className="w-full bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 transition-colors" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-600 dark:text-gray-400 mb-2">Work Email</label>
                                <input required type="email" name="email" className="w-full bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 transition-colors" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-600 dark:text-gray-400 mb-2">Project Details</label>
                                <textarea required name="message" rows="4" className="w-full bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 transition-colors resize-none"></textarea>
                            </div>

                            {error && (
                                <div className="text-rose-500 dark:text-rose-400 text-sm bg-rose-500/10 border border-rose-500/20 rounded-xl p-3 text-center transition-all">
                                    {error}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={formStatus === "submitting"}
                                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.02] transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {formStatus === "submitting" ? "Sending..." : "Send Message"}
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
