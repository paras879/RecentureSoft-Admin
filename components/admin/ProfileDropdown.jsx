"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Settings, LogOut, Globe, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ProfileDropdown({ currentUsername = "Admin" }) {
    const [isOpen, setIsOpen] = useState(false);
    const [avatarUrl, setAvatarUrl] = useState(null);
    const [firstName, setFirstName] = useState(currentUsername);
    const [lastName, setLastName] = useState("");
    const dropdownRef = useRef(null);
    const router = useRouter();

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen]);

    // Load and listen for avatar/profile updates
    useEffect(() => {
        const loadProfileData = () => {
            const savedAvatar = localStorage.getItem(`adminAvatar_${currentUsername}`);
            if (savedAvatar) setAvatarUrl(savedAvatar);

            const savedFirstName = localStorage.getItem(`adminFirstName_${currentUsername}`);
            if (savedFirstName) setFirstName(savedFirstName);

            const savedLastName = localStorage.getItem(`adminLastName_${currentUsername}`);
            if (savedLastName) setLastName(savedLastName);
        };
        
        const handleEvent = (e) => {
            if (e.detail && e.detail.currentUsername === currentUsername) {
                loadProfileData();
            } else if (!e.detail) { // fallback
                loadProfileData();
            }
        };

        loadProfileData();
        window.addEventListener("avatarUpdated", handleEvent);
        window.addEventListener("profileUpdated", handleEvent);
        return () => {
            window.removeEventListener("avatarUpdated", handleEvent);
            window.removeEventListener("profileUpdated", handleEvent);
        };
    }, [currentUsername]);

    const handleLogout = () => {
        document.cookie = "admin_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        router.push("/admin/login");
        router.refresh();
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-3 pl-4 border-l border-slate-200 dark:border-white/10 outline-none group"
            >
                <div className="flex flex-col items-end hidden sm:flex whitespace-nowrap">
                    <span className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">{firstName} {lastName}</span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">Master Admin</span>
                </div>
                <div className="flex items-center gap-1">
                    <div className="w-10 h-10 bg-gradient-to-tr from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold shadow-md shadow-cyan-500/20 group-hover:scale-105 transition-transform overflow-hidden shrink-0">
                        {avatarUrl ? (
                            <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                        ) : (
                            `${firstName ? firstName.charAt(0).toUpperCase() : ""}${lastName ? lastName.charAt(0).toUpperCase() : ""}` || "A"
                        )}
                    </div>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-300 hidden sm:block ${isOpen ? "rotate-180" : ""}`} />
                </div>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-3 w-56 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200/50 dark:border-white/10 rounded-2xl shadow-xl shadow-slate-200/20 dark:shadow-black/40 overflow-hidden z-50 origin-top-right"
                    >
                        <div className="p-4 border-b border-slate-100 dark:border-white/5 sm:hidden">
                            <p className="text-sm font-semibold text-slate-900 dark:text-white">{firstName} {lastName}</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">Master Admin</p>
                        </div>
                        
                        <div className="p-2 flex flex-col gap-1">
                            <Link 
                                href="/admin/settings" 
                                onClick={() => setIsOpen(false)}
                                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                            >
                                <Settings className="w-4 h-4" />
                                Account Settings
                            </Link>
                            
                            <Link 
                                href="/" 
                                target="_blank"
                                onClick={() => setIsOpen(false)}
                                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                            >
                                <Globe className="w-4 h-4" />
                                View Live Website
                            </Link>
                        </div>

                        <div className="p-2 border-t border-slate-100 dark:border-white/5">
                            <button 
                                onClick={handleLogout}
                                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                            >
                                <LogOut className="w-4 h-4" />
                                Secure Logout
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
