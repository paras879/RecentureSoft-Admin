"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
    LayoutDashboard, 
    MessageSquare, 
    CalendarCheck, 
    FileText, 
    LogOut,
    Users,
    Settings,
    BotMessageSquare,
    Menu,
    X,
    Sparkles,
    Activity,
    UserCog
} from "lucide-react";

export default function AdminSidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);

    const [role, setRole] = useState('super_admin');

    useEffect(() => {
        fetch('/api/admin/me')
            .then(res => res.json())
            .then(data => {
                if (data.role) setRole(data.role);
            })
            .catch(console.error);
    }, []);

    const handleLogout = async () => {
        try {
            await fetch("/api/admin/logout", { method: "POST" });
        } catch (err) {
            console.error("Logout failed", err);
        }
        router.push("/admin/login");
        router.refresh();
    };

    const links = [
        { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
        { name: "Leads & Contact", href: "/admin/leads", icon: Users },
        { name: "Project Inquiries", href: "/admin/projects", icon: MessageSquare },
        { name: "Meeting Requests", href: "/admin/meetings", icon: CalendarCheck },
        { name: "Blogs Content", href: "/admin/blogs", icon: FileText },
        { name: "AI Chat History", href: "/admin/chats", icon: BotMessageSquare },
        ...(role === "super_admin" ? [
            { name: "Activity Logs", href: "/admin/activity", icon: Activity },
            { name: "Manage Admins", href: "/admin/admins", icon: UserCog }
        ] : []),
        { name: "Settings", href: "/admin/settings", icon: Settings },
    ];

    return (
        <>
        {/* Glowing Hamburger Button for Mobile */}
        <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="md:hidden fixed top-5 left-4 z-40 p-2.5 rounded-xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-lg shadow-cyan-500/10 border border-slate-200/50 dark:border-white/10 text-cyan-600 dark:text-cyan-400"
        >
            <Menu className="w-5 h-5" />
        </motion.button>

        {/* Mobile Overlay */}
        <AnimatePresence>
            {isOpen && (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 md:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </AnimatePresence>

        {/* Glassmorphic Sidebar */}
        <aside className={`fixed md:relative top-0 left-0 h-full z-50 w-64 bg-white/70 dark:bg-slate-900/60 backdrop-blur-2xl border-r border-slate-200/50 dark:border-white/10 flex flex-col flex-shrink-0 transition-transform duration-300 ease-in-out ${
            isOpen ? "translate-x-0 shadow-2xl shadow-cyan-900/20" : "-translate-x-full md:translate-x-0"
        }`}>
            {/* Header / Logo */}
            <div className="h-20 flex items-center justify-between px-6 md:px-8 border-b border-slate-200/50 dark:border-white/5">
                <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-cyan-500 animate-pulse" />
                    <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-500 tracking-tight">
                        Portal
                    </h2>
                </div>
                <button onClick={() => setIsOpen(false)} className="md:hidden text-slate-400 hover:text-cyan-500 transition-colors p-1 bg-white/5 rounded-md">
                    <X className="w-5 h-5" />
                </button>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 overflow-y-auto py-6 px-4 flex flex-col gap-2 relative">
                {/* Decorative glow behind links */}
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-32 h-32 bg-cyan-400/10 dark:bg-cyan-500/10 blur-3xl rounded-full pointer-events-none" />

                {links.map((link, i) => {
                    const Icon = link.icon;
                    const isActive = pathname === link.href || pathname.startsWith(link.href + "/");

                    return (
                        <Link key={link.name} href={link.href} onClick={() => setIsOpen(false)}>
                            <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.05 }}
                                whileHover={{ x: 4 }}
                                whileTap={{ scale: 0.98 }}
                                className={`group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium relative overflow-hidden ${
                                    isActive 
                                        ? "text-cyan-700 dark:text-cyan-300 shadow-sm border border-cyan-200/50 dark:border-cyan-500/20 bg-cyan-50/80 dark:bg-cyan-500/10" 
                                        : "text-slate-600 dark:text-slate-400 hover:bg-slate-100/50 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white border border-transparent"
                                }`}
                            >
                                {/* Active Link Glow */}
                                {isActive && (
                                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-transparent pointer-events-none" />
                                )}
                                <Icon className={`w-5 h-5 z-10 transition-transform group-hover:scale-110 ${isActive ? "opacity-100 drop-shadow-md text-cyan-500" : "opacity-70"}`} />
                                <span className="z-10">{link.name}</span>
                            </motion.div>
                        </Link>
                    );
                })}
            </nav>

            {/* Logout Button */}
            <div className="p-4 border-t border-slate-200/50 dark:border-white/5 bg-slate-50/50 dark:bg-white/[0.01]">
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleLogout}
                    className="group relative overflow-hidden flex w-full items-center gap-3 px-4 py-3 text-red-600 dark:text-red-400 bg-red-50/50 hover:bg-red-100/80 dark:bg-red-500/10 dark:hover:bg-red-500/20 rounded-xl transition-colors font-medium border border-red-100 dark:border-red-500/20"
                >
                    <LogOut className="w-5 h-5 opacity-80 group-hover:translate-x-1 transition-transform" />
                    <span>Secure Logout</span>
                </motion.button>
            </div>
        </aside>
        </>
    );
}
