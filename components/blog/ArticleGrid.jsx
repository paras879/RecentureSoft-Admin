"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const categories = ["All", "Design", "Backend", "Mobile", "Frontend", "Marketing"];

export default function ArticleGrid({ articles = [] }) {
    const [activeFilter, setActiveFilter] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");

    const formatDate = (dateString) => {
        if (!dateString) return "";
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    const filteredArticles = articles.filter(a => {
        const matchesCategory = activeFilter === "All" || a.category === activeFilter;
        const matchesSearch = a.title.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <section className="pt-[clamp(1rem,2vw,2rem)] pb-[clamp(1.5rem,5vw,5rem)] bg-slate-50 dark:bg-[#020617] transition-colors duration-300">
            <div className="container mx-auto px-6 max-w-7xl">

                {/* Filters and Search */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8 md:mb-12">
                    <div className="flex flex-wrap gap-2">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveFilter(cat)}
                                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 border ${activeFilter === cat ? "bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 border-cyan-500/50" : "bg-transparent text-slate-600 dark:text-gray-400 border-slate-300 dark:border-white/10 hover:border-slate-400 dark:hover:border-white/30"}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                    <div className="relative w-full md:w-64">
                        <input
                            type="text"
                            placeholder="Search articles..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-white dark:bg-white/[0.02] border border-slate-300 dark:border-white/10 rounded-full py-2 pl-4 pr-10 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 shadow-sm dark:shadow-none"
                        />
                        <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                </div>

                {/* Grid */}
                <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatePresence>
                        {filteredArticles.map((article) => (
                            <Link key={article._id || article.id}
                                href={`/blog/${article.slug}`}
                                prefetch={true}
                                className="block" >
                                <motion.article
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.4 }}
                                    key={article._id || article.id}
                                    className="group flex flex-col h-full bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 rounded-3xl overflow-hidden hover:bg-slate-50 dark:hover:bg-white/[0.04] transition-colors cursor-pointer shadow-sm dark:shadow-none"
                                >
                                    <div className="h-48 overflow-hidden relative">
                                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
                                        <Image
                                            src={article.image}
                                            alt={article.title || 'Article Image'}
                                            fill
                                            unoptimized={true}
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                        />
                                    </div>
                                    <div className="flex flex-col flex-grow p-5 md:p-6 lg:p-8">
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="text-cyan-600 dark:text-cyan-400 text-xs font-semibold uppercase tracking-wider">{article.category}</span>
                                            <span className="text-slate-500 dark:text-gray-500 text-xs">{article.readingTime || article.readTime || "5 min"} read</span>
                                        </div>
                                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors line-clamp-2">
                                            {article.title}
                                        </h3>
                                        <p className="text-slate-600 dark:text-gray-400 text-sm leading-relaxed mb-6 flex-grow line-clamp-3">
                                            {article.excerpt}
                                        </p>
                                        <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-200 dark:border-white/5">
                                            <span className="text-slate-500 dark:text-gray-500 text-xs">{formatDate(article.createdAt || article.date)}</span>
                                            <span className="text-cyan-600 dark:text-cyan-400 text-xs font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                                                Read Article
                                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </span>
                                        </div>
                                    </div>
                                </motion.article>
                            </Link>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {filteredArticles.length === 0 && (
                    <div className="text-center py-20 text-slate-500 dark:text-gray-500">
                        No articles found matching your criteria.
                    </div>
                )}
            </div>
        </section>
    );
}
