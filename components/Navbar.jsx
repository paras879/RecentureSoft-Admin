"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "./ThemeToggle";


const navLinks = [
    { name: "Home", href: "/" },
    { name: "Solutions", href: "/solutions" },
    { name: "About Us", href: "/about" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Blog", href: "/blog" },
    { name: "Events", href: "/events" },
    { name: "News", href: "/news" },
    { name: "Contact", href: "/contact" },
];

export default function Navbar() {
    const [hoveredLink, setHoveredLink] = useState(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        return () => { document.body.style.overflow = "auto"; };
    }, [isMobileMenuOpen]);

    return (
        <header className="fixed top-0 left-0 right-0 z-[9999] px-2 sm:px-4 lg:px-6 py-2">
            <nav className="max-w-7xl mx-auto bg-white/70 dark:bg-slate-950/70 backdrop-blur-2xl border border-white/30 dark:border-white/10 rounded-full shadow-[0_10px_40px_rgba(0,0,0,0.12)] dark:shadow-[0_10px_40px_rgba(0,0,0,0.5)] transition-all duration-300">
                <div className="px-4 lg:px-8 h-14 lg:h-16 flex items-center justify-between">

                    {/* ════ LOGO AREA ════ */}
                    <Link
                        href="/"
                        prefetch={true}
                        className="flex items-center gap-2 group"
                    >
                        <span className="text-[clamp(1rem,4vw,1.25rem)] font-bold tracking-wider text-slate-800 dark:text-white transition-colors duration-300 group-hover:text-primary dark:group-hover:text-cyan-400 flex-shrink-0">
                            <img src="/Logo.png" alt="RecentureSoft Logo" className="h-10 w-auto object-contain" />
                        </span>
                    </Link>

                    {/* ════ DESKTOP NAV LINKS ════ */}
                    <ul className="hidden lg:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <li
                                key={link.name}
                                className="relative"
                                onMouseEnter={() => setHoveredLink(link.name)}
                                onMouseLeave={() => setHoveredLink(null)}
                            >
                                <Link
                                    href={link.href}
                                    prefetch={true}
                                    className="relative px-3 py-2 text-sm font-medium tracking-wide text-slate-600 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white transition-colors duration-300 block z-10"
                                >
                                    {link.name}
                                </Link>
                                <AnimatePresence>
                                    {hoveredLink === link.name && (
                                        <motion.div
                                            layoutId="navHoverPill"
                                            className="absolute inset-0 bg-slate-100 dark:bg-white/10 rounded-full z-0"
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            transition={{ duration: 0.2 }}
                                        />
                                    )}
                                </AnimatePresence>
                            </li>
                        ))}
                    </ul>

                    {/* ════ DESKTOP CTA BUTTON & THEME TOGGLE ════ */}
                    <div className="hidden lg:flex items-center gap-4">
                        <ThemeToggle />
                        <button className="relative group px-6 py-3.5 rounded-full min-h-[44px] overflow-hidden font-semibold text-sm text-white shadow-lg shadow-cyan-500/20 hover:scale-105 hover:shadow-cyan-500/40 transition-all duration-300">
                            <span className="absolute inset-0 bg-gradient-to-r from-primary to-accent dark:from-cyan-500 dark:to-indigo-600 transition-transform duration-300 group-hover:scale-105" />
                            <Link href="/contact" prefetch={true} className="relative z-10">Get A Quote</Link>
                        </button>
                    </div>

                    {/* ════ MOBILE/TABLET CONTROLS (<1024px) ════ */}
                    <div className="flex lg:hidden items-center gap-3">
                        <ThemeToggle />
                        {/* Quote Button */}
                        <Link
                            href="/contact"
                            prefetch={true}
                            className="hidden sm:inline-block px-4 py-2 bg-gradient-to-r from-primary to-accent dark:from-cyan-500 dark:to-indigo-600 rounded-full font-bold text-sm text-white shadow-md shadow-cyan-500/20 hover:scale-105 transition-all duration-300"
                        >
                            Quote
                        </Link>

                        {/* Hamburger Button */}
                        <motion.button
                            aria-label="Menu"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="relative z-50 p-2 text-slate-600 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white transition-colors"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </motion.button>
                    </div>
                </div>
            </nav>

            {/* ════ FULL SCREEN MOBILE DRAWER ════ */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        className="fixed inset-0 z-40 bg-slate-900/40 dark:bg-black/60 backdrop-blur-xl lg:hidden flex justify-end"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, transition: { delay: 0.3 } }}
                    >
                        {/* Drawer content */}
                        <motion.div
                            className="w-[85vw] max-w-[320px] sm:w-[320px] sm:max-w-none h-full bg-white dark:bg-[#020617] sm:border-l border-slate-200 dark:border-white/10 p-4 sm:p-5 flex flex-col"
                            initial={{ x: "100%" }}
                            animate={{ x: "0%" }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        >
                            {/* Header inside drawer - STICKY */}
                            <div className="sticky top-0 z-10 flex justify-between items-center bg-white dark:bg-[#020617] pb-3 border-b border-slate-200 dark:border-white/5 mb-4 pt-1">
                                <span className="text-sm font-bold tracking-widest text-slate-500 dark:text-gray-400 uppercase">
                                    Navigation
                                </span>
                                <button
                                    className="p-2.5 text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 rounded-full transition-colors touch-manipulation"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    aria-label="Close menu"
                                >
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            {/* Menu Links */}
                            <div className="flex flex-col gap-1 overflow-y-auto pb-4 scrollbar-hide">
                                {navLinks.map((link, i) => {
                                    const isActive = pathname === link.href;
                                    return (
                                        <Link
                                            key={link.name}
                                            href={link.href}
                                            prefetch={true}
                                            className={`text-base font-medium transition-all duration-300 block px-3 py-2.5 rounded-lg active:scale-[0.98] ${isActive ? "bg-primary/10 dark:bg-cyan-500/10 text-primary dark:text-cyan-400" : "text-slate-600 dark:text-gray-300 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white"}`}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            <motion.div
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.05 * i, type: "spring", stiffness: 300, damping: 24 }}
                                                className="flex items-center justify-between"
                                            >
                                                {link.name}
                                                {isActive && (
                                                    <motion.div
                                                        layoutId="mobileActiveIndicator"
                                                        className="w-1.5 h-1.5 rounded-full bg-primary dark:bg-cyan-400 shadow-[0_0_8px_rgba(14,165,233,0.5)] dark:shadow-[0_0_8px_rgba(34,211,238,0.8)]"
                                                    />
                                                )}
                                            </motion.div>
                                        </Link>
                                    )
                                })}
                            </div>

                            <motion.div
                                className="mt-auto pt-4 border-t border-slate-200 dark:border-white/5"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                            >
                                <Link href="/contact" className="w-full relative group px-4 py-3 rounded-lg overflow-hidden font-bold text-white shadow-lg shadow-primary/20 dark:shadow-cyan-500/20 block text-center active:scale-[0.98] transition-transform" onClick={() => setIsMobileMenuOpen(false)}>
                                    <span className="absolute inset-0 bg-gradient-to-r from-primary to-accent dark:from-cyan-500 dark:to-indigo-600" />
                                    <span className="relative z-10">Get A Quote</span>
                                </Link>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
