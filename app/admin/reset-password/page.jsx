"use client";

import { useState, Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import { Lock, Loader2, KeyRound } from "lucide-react";

function ResetPasswordForm() {
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const handleReset = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        if (!token) {
            setError("Invalid or missing reset token.");
            setLoading(false);
            return;
        }

        if (password !== confirm) {
            setError("Passwords do not match.");
            setLoading(false);
            return;
        }

        try {
            const res = await fetch("/api/admin/reset-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token, password }),
            });

            const data = await res.json();
            if (res.ok) {
                setSuccess(true);
                setTimeout(() => {
                    router.push("/admin/login");
                }, 3000);
            } else {
                setError(data.message || "Failed to reset password.");
            }
        } catch (error) {
            console.error("Reset error:", error);
            setError("Something went wrong. Try again.");
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="flex flex-col items-center justify-center py-10 text-center gap-4">
                <div className="w-16 h-16 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center">
                    <KeyRound className="w-8 h-8" />
                </div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Password Reset Successful!</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">Redirecting you to login...</p>
            </div>
        );
    }

    return (
        <form onSubmit={handleReset} className="flex flex-col gap-6">
            {error && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 text-sm rounded-xl text-center font-medium animate-shake">
                    {error}
                </div>
            )}

            <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300 ml-1">New Password</label>
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

            <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300 ml-1">Confirm New Password</label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-slate-400" />
                    </div>
                    <input
                        type="password"
                        value={confirm}
                        onChange={(e) => setConfirm(e.target.value)}
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
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Save New Password"}
            </button>
        </form>
    );
}

export default function ResetPasswordPage() {
    const [logoUrl, setLogoUrl] = useState("/Logo.png");

    useEffect(() => {
        fetch("/api/admin/settings")
            .then(res => res.json())
            .then(data => {
                if (data.success && data.settings?.logoUrl) {
                    setLogoUrl(data.settings.logoUrl);
                }
            })
            .catch(console.error);
    }, []);

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-slate-50 dark:bg-[#020617] p-4 relative overflow-hidden">
            <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 rounded-3xl shadow-xl dark:shadow-none p-8 sm:p-10 backdrop-blur-2xl relative z-10"
            >
                <div className="flex flex-col items-center justify-center mb-10">
                    <div className="relative w-48 h-12 mb-6">
                        <img 
                            src={logoUrl} 
                            alt="RecentureSoft Logo" 
                            className="w-full h-full object-contain"
                        />
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white text-center">
                        Create New Password
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mt-2 text-center">
                        Please choose a strong password
                    </p>
                </div>

                <Suspense fallback={<div className="flex justify-center p-8"><Loader2 className="w-6 h-6 animate-spin text-cyan-500" /></div>}>
                    <ResetPasswordForm />
                </Suspense>
            </motion.div>
        </div>
    );
}
