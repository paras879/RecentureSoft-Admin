"use client";

import { motion } from "framer-motion";

export default function EventYearSelector({ years, selectedYear, onSelectYear }) {
    if (!years || years.length === 0) return null;

    return (
        <div className="flex items-center justify-start sm:justify-center gap-3 overflow-x-auto whitespace-nowrap scrollbar-none pb-2 sm:pb-0 flex-nowrap sm:flex-wrap">
            {years.map((year) => {
                const isActive = selectedYear === year;
                return (
                    <button
                        key={year}
                        onClick={() => onSelectYear(year)}
                        className="relative px-6 py-2.5 rounded-full text-sm font-semibold tracking-wide transition-all duration-300 overflow-hidden cursor-pointer flex-shrink-0"
                    >
                        {/* Background with motion active indicator */}
                        {isActive ? (
                            <motion.div
                                layoutId="activeYearBg"
                                className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 shadow-[0_0_20px_rgba(6,182,212,0.4)]"
                                transition={{ type: "spring", stiffness: 380, damping: 30 }}
                            />
                        ) : (
                            <div className="absolute inset-0 bg-white/5 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-cyan-500/30 dark:hover:border-cyan-400/30 transition-all rounded-full" />
                        )}

                        {/* Content text */}
                        <span
                            className={`relative z-10 ${
                                isActive
                                    ? "text-white font-bold"
                                    : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                            }`}
                        >
                            {year}
                        </span>
                    </button>
                );
            })}
        </div>
    );
}
