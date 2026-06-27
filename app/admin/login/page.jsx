"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import { Lock, User, ArrowRight, Loader2 } from "lucide-react";

export default function AdminLogin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [msg, setMsg] = useState("");
    const [isForgot, setIsForgot] = useState(false);
    const [resetEmail, setResetEmail] = useState("");
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/admin/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            const data = await res.json();

            if (res.ok) {
                // Redirect to dashboard
                router.push("/admin/dashboard");
                router.refresh();
            } else {
                setError(data.message || "Invalid credentials");
            }
        } catch (error) {
            console.error("Login error:", error);
            setError("Something went wrong. Try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleForgot = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setMsg("");

        try {
            const res = await fetch("/api/admin/forgot-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: resetEmail }),
            });

            const data = await res.json();
            if (res.ok) {
                setMsg(data.message || "Reset link sent!");
            } else {
                setError(data.message || "Failed to send reset link");
            }
        } catch (error) {
            console.error("Forgot password error:", error);
            setError("Something went wrong. Try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-slate-50 dark:bg-[#020617] p-4 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 rounded-3xl shadow-xl dark:shadow-none p-8 sm:p-10 backdrop-blur-2xl relative z-10"
            >
                <div className="flex flex-col items-center justify-center mb-10">
                    <div className="relative w-48 h-12 mb-6">
                        <Image
                            src="/Logo.png"
                            alt="RecentureSoft Logo"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white text-center">
                        {isForgot ? "Reset Password" : "Secure Portal"}
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mt-2 text-center">
                        {isForgot ? "Enter your admin email to get a reset link" : "Enter your master credentials to continue"}
                    </p>
                </div>

                {isForgot ? (
                    <form onSubmit={handleForgot} className="flex flex-col gap-6">
                        {error && (
                            <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 text-sm rounded-xl text-center font-medium animate-shake">
                                {error}
                            </div>
                        )}
                        {msg && (
                            <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-sm rounded-xl text-center font-medium">
                                {msg}
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300 ml-1">Email Address</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <User className="h-5 w-5 text-slate-400" />
                                </div>
                                <input
                                    type="email"
                                    value={resetEmail}
                                    onChange={(e) => setResetEmail(e.target.value)}
                                    className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all"
                                    placeholder="admin@recenturesoft.com"
                                    required
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-3 mt-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-cyan-500/25 disabled:opacity-70 disabled:cursor-not-allowed group"
                            >
                                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Send Reset Link"}
                            </button>
                            <button
                                type="button"
                                onClick={() => { setIsForgot(false); setError(""); setMsg(""); }}
                                className="text-sm text-slate-500 hover:text-cyan-500 font-medium text-center transition-colors"
                            >
                                Back to Login
                            </button>
                        </div>
                    </form>
                ) : (
                    <form onSubmit={handleLogin} className="flex flex-col gap-6">
                        {error && (
                            <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 text-sm rounded-xl text-center font-medium animate-shake">
                                {error}
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300 ml-1">Username</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <User className="h-5 w-5 text-slate-400" />
                                </div>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all"
                                    placeholder="Admin ID"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between ml-1">
                                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Password</label>
                                <button type="button" onClick={() => { setIsForgot(true); setError(""); }} className="text-xs font-medium text-cyan-600 hover:text-cyan-500 transition-colors">Forgot Password?</button>
                            </div>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-slate-400" />
                                </div>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full mt-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-cyan-500/25 disabled:opacity-70 disabled:cursor-not-allowed group"
                        >
                            {loading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <>
                                    Access Dashboard
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>
                )}
            </motion.div>
        </div>
    );
}
