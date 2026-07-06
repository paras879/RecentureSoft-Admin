"use client";

import { motion } from "framer-motion";
import { MessageSquare, CalendarCheck, Users, FileText } from "lucide-react";

const ICON_MAP = {
    MessageSquare,
    CalendarCheck,
    Users,
    FileText,
};

import Link from "next/link";

export default function DashboardStats({ stats }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, idx) => {
                const Icon = ICON_MAP[stat.iconName];
                const cardContent = (
                    <motion.div 
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1, duration: 0.4 }}
                        className="bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-sm flex flex-col gap-4 hover:border-blue-500/30 transition-colors"
                    >
                        <div className="flex justify-between items-center mb-1">
                            <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg} ${stat.color}`}>
                                    <Icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-3xl font-bold text-slate-900 dark:text-white">{stat.value}</h3>
                            </div>
                            <span className="flex items-center text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-1 rounded-full">
                                + Live
                            </span>
                        </div>
                        
                        <div>
                            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">{stat.title}</p>
                        </div>
                    </motion.div>
                );

                if (stat.href) {
                    return (
                        <Link href={stat.href} key={idx} className="block hover:-translate-y-1 transition-transform">
                            {cardContent}
                        </Link>
                    );
                }

                return cardContent;
            })}
        </div>
    );
}
