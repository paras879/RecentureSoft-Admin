"use client";

if (typeof window !== 'undefined') {
    const originalWarn = console.warn;
    console.warn = function (...args) {
        if (typeof args[0] === 'string' && args[0].indexOf('THREE.Clock') !== -1) return;
        originalWarn.apply(console, args);
    };
}

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ChatInterface from "./ChatInterface";

export default function RecentureAI() {
    const [isOpen, setIsOpen] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [windowWidth, setWindowWidth] = useState(1200);

    const [showWelcome, setShowWelcome] = useState(false);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        handleResize();
        window.addEventListener("resize", handleResize);

        const handleKeyDown = (e) => {
            if (e.key === "Escape" && isOpen) {
                setIsOpen(false);
            }
        };
        window.addEventListener("keydown", handleKeyDown);

        // First visit welcome trigger
        let welcomeTimeout;
        let hideTimeout;
        const dismissed = localStorage.getItem("recenture_ai_welcome_dismissed");
        if (!dismissed) {
            welcomeTimeout = setTimeout(() => {
                setShowWelcome(true);
                // Auto-hide after 8 seconds
                hideTimeout = setTimeout(() => {
                    setShowWelcome(false);
                }, 8000);
            }, 2000);
        }

        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("keydown", handleKeyDown);
            clearTimeout(welcomeTimeout);
            clearTimeout(hideTimeout);
        };
    }, [isOpen]);

    const handleStartChat = () => {
        setIsOpen(true);
        setShowWelcome(false);
        localStorage.setItem("recenture_ai_welcome_dismissed", "true");
    };

    const handleDismissWelcome = () => {
        setShowWelcome(false);
        localStorage.setItem("recenture_ai_welcome_dismissed", "true");
    };

    return (
        <div className="fixed bottom-0 md:bottom-6 right-0 md:right-6 z-[9999] flex flex-col items-end font-sans pointer-events-none">
            <AnimatePresence>
                {/* First-time Welcome Experience Popup */}
                {showWelcome && !isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 15, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="mb-4 mr-4 md:mr-0 w-[280px] sm:w-[320px] p-5 rounded-2xl bg-white/95 dark:bg-slate-900/90 border border-slate-200 dark:border-white/10 backdrop-blur-xl shadow-xl dark:shadow-2xl relative text-left pointer-events-auto"
                    >
                        {/* Close button */}
                        <button
                            onClick={handleDismissWelcome}
                            aria-label="Close welcome"
                            className="absolute top-3 right-3 p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <div className="flex flex-col gap-2">
                            <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                                <span>👋</span> Welcome to RecentureSoft
                            </h4>
                            <div className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed flex flex-col gap-1.5 mt-1">
                                <p className="font-semibold">Hi there! I'm your AI Assistant.</p>
                                <p>How may I help you today?</p>
                                <ul className="list-disc pl-4 space-y-0.5 text-slate-500 dark:text-slate-400 font-medium">
                                    <li>Explore our Services</li>
                                    <li>Get a Project Estimate</li>
                                    <li>Schedule a Consultation</li>
                                    <li>Learn about our Technologies</li>
                                </ul>
                            </div>

                            <div className="flex gap-2.5 mt-3.5">
                                <button
                                    onClick={handleStartChat}
                                    className="flex-1 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-bold hover:shadow-md hover:from-cyan-400 hover:to-blue-500 transition-all text-center"
                                >
                                    Start Chat
                                </button>
                                <button
                                    onClick={handleDismissWelcome}
                                    className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 text-xs font-semibold transition-all"
                                >
                                    Maybe Later
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ 
                            opacity: 0, 
                            y: 50, 
                            scale: 0.95,
                            width: windowWidth < 768 ? "75vw" : isMinimized ? "300px" : windowWidth < 1024 ? "400px" : "450px",
                            height: windowWidth < 768 ? "60vh" : isMinimized ? "auto" : "min(720px, 85vh)"
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                            scale: 1,
                            width: windowWidth < 768 ? "75vw" : isMinimized ? "300px" : windowWidth < 1024 ? "400px" : "450px",
                            height: windowWidth < 768 ? "60vh" : isMinimized ? "auto" : "min(720px, 85vh)"
                        }}
                        exit={{ 
                            opacity: 0, 
                            y: 50, 
                            scale: 0.95,
                            width: windowWidth < 768 ? "75vw" : isMinimized ? "300px" : windowWidth < 1024 ? "400px" : "450px",
                            height: windowWidth < 768 ? "60vh" : isMinimized ? "auto" : "min(720px, 85vh)"
                        }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className={`mb-0 md:mb-4 bg-white/95 dark:bg-[#0b1120]/95 backdrop-blur-3xl border border-slate-200 dark:border-white/10 shadow-[0_20px_50px_rgba(8,_145,_178,_0.1)] overflow-hidden flex flex-col origin-bottom md:origin-bottom-right pointer-events-auto transition-all ${windowWidth < 768 ? 'rounded-3xl mb-4 mr-4 w-[75vw]' : 'rounded-3xl'
                            }`}
                    >
                        <ChatInterface
                            onClose={() => setIsOpen(false)}
                            isMinimized={isMinimized}
                            onToggleMinimize={() => setIsMinimized(!isMinimized)}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating Action Button */}
            <div className={`relative group w-14 h-14 md:w-16 md:h-16 pointer-events-auto transition-all ${isOpen && windowWidth < 768 ? 'hidden' : 'mb-6 mr-6 md:mb-0 md:mr-0'}`}>
                {/* Pulse Ring (visible only when chat is closed) */}
                {!isOpen && (
                    <div className="absolute inset-0 rounded-full bg-cyan-500/30 animate-ping pointer-events-none scale-105" style={{ animationDuration: '3s' }} />
                )}

                <motion.button
                    onClick={() => {
                        setIsOpen(!isOpen);
                        if (showWelcome) setShowWelcome(false);
                    }}
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.94 }}
                    aria-label="Toggle AI Assistant"
                    aria-expanded={isOpen}
                    className="w-full h-full rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 p-[2px] shadow-[0_0_20px_rgba(8,145,178,0.4)] relative flex items-center justify-center transition-all duration-300 border border-white/20 z-50"
                >
                    <div className="w-full h-full bg-[#090d16] rounded-full flex items-center justify-center relative overflow-hidden transition-colors duration-300">
                        {/* Glow effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-indigo-500/20 group-hover:opacity-100 opacity-0 transition-opacity duration-300" />

                        {isOpen ? (
                            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg className="w-6 h-6 text-cyan-400 group-hover:scale-105 transition-transform drop-shadow-[0_0_8px_rgba(8,145,178,0.8)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                                <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                                <line x1="12" x2="12" y1="19" y2="22" />
                            </svg>
                        )}
                    </div>
                </motion.button>

                {/* Hover Tooltip (Desktop Only) */}
                <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 hidden md:group-hover:block px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-bold tracking-wide shadow-lg whitespace-nowrap select-none pointer-events-none transition-all border border-slate-200 dark:border-white/10">
                    AI Assistant
                    <div className="absolute left-full top-1/2 -translate-y-1/2 border-[5px] border-transparent border-l-white dark:border-l-slate-800" />
                </div>
            </div>
        </div>
    );
}
