"use client";

import dynamic from "next/dynamic";

import { useState, useEffect } from "react";

const RecentureAI = dynamic(() => import("./RecentureAI"), {
    ssr: false,
    loading: () => (
        <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end font-sans">
            <div className="relative group w-12 h-12 md:w-14 md:h-14">
                <div className="absolute inset-0 rounded-full bg-blue-500/30 animate-ping pointer-events-none scale-105" style={{ animationDuration: '3s' }} />
                <div className="w-full h-full rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-0.5 shadow-lg shadow-indigo-500/25 relative flex items-center justify-center border border-white/10">
                    <div className="w-full h-full bg-white dark:bg-[#090d16] rounded-full flex items-center justify-center relative overflow-hidden">
                        <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/>
                            <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                            <line x1="12" x2="12" y1="19" y2="22"/>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    )
});

import { usePathname } from "next/navigation";

export default function RecentureAIWrapper() {
    const [shouldRender, setShouldRender] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        // Desktop loads immediately
        if (window.innerWidth >= 768) {
            setShouldRender(true);
            return;
        }

        // Mobile lazy loads on first interaction
        const handleInteraction = () => {
            setShouldRender(true);
            cleanUp();
        };

        const cleanUp = () => {
            window.removeEventListener("scroll", handleInteraction);
            window.removeEventListener("mousemove", handleInteraction);
            window.removeEventListener("touchstart", handleInteraction);
        };

        window.addEventListener("scroll", handleInteraction, { passive: true });
        window.addEventListener("mousemove", handleInteraction, { passive: true });
        window.addEventListener("touchstart", handleInteraction, { passive: true });

        return () => {
            cleanUp();
        };
    }, []);

    // Disable chatbot on all admin pages
    if (pathname?.startsWith("/admin")) {
        return null;
    }

    if (!shouldRender) return null;

    return <RecentureAI />;
}
