"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Search, Calendar, Globe, ArrowUpRight, RefreshCw, AlertTriangle } from "lucide-react";
import Image from "next/image";

const CATEGORIES = [
    { label: "All", id: "all" },
    { label: "Technology", id: "technology" },
    { label: "AI", id: "ai" },
    { label: "Cybersecurity", id: "cybersecurity" },
    { label: "Cloud Computing", id: "cloud" },
    { label: "Programming", id: "programming" },
    { label: "Startups", id: "startups" }
];

const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800";

function NewsImage({ src, alt, priority = false, sizes = "", className = "" }) {
    const [imgSrc, setImgSrc] = useState(src || DEFAULT_IMAGE);
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        setImgSrc(src || DEFAULT_IMAGE);
        setIsLoaded(false);
        setHasError(false);
    }, [src]);

    const handleError = () => {
        if (!hasError) {
            setImgSrc(DEFAULT_IMAGE);
            setHasError(true);
        }
    };

    return (
        <div className="relative w-full h-full bg-slate-200 dark:bg-slate-800/50 overflow-hidden">
            {!isLoaded && (
                <div className="absolute inset-0 bg-slate-200 dark:bg-slate-800 animate-pulse z-10" />
            )}
            <Image
                src={imgSrc}
                alt={alt}
                fill
                priority={priority}
                unoptimized={true}
                sizes={sizes}
                className={`${className} transition-opacity duration-300 ease-in-out ${
                    isLoaded ? "opacity-100" : "opacity-0"
                }`}
                onLoad={() => setIsLoaded(true)}
                onError={handleError}
            />
        </div>
    );
}

export default function NewsList() {
    const [newsItems, setNewsItems] = useState([]);
    const [nextPageToken, setNextPageToken] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [error, setError] = useState(null);

    // Filter, search, and page states
    const [activeCategory, setActiveCategory] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");

    // Debounce search input to avoid hitting API repeatedly
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchQuery);
        }, 400);
        return () => clearTimeout(timer);
    }, [searchQuery]);

    // Fetch repository data
    const fetchNews = useCallback(async (pageToken = "", isLoadMore = false) => {
        if (isLoadMore) {
            setIsLoadingMore(true);
        } else {
            setIsLoading(true);
            setError(null);
        }

        try {
            const params = new URLSearchParams({
                category: activeCategory,
                search: debouncedSearch
            });
            if (pageToken) {
                params.append("page", pageToken);
            }

            const res = await fetch(`/api/news?${params.toString()}`);
            if (!res.ok) {
                throw new Error("Failed to retrieve news data");
            }
            
            const data = await res.json();
            
            const fetchedResults = data.results || [];
            const nextCursor = data.nextPage || null;

            if (isLoadMore) {
                setNewsItems((prev) => [...prev, ...fetchedResults]);
            } else {
                setNewsItems(fetchedResults);
            }
            setNextPageToken(nextCursor);
        } catch (err) {
            console.error("Failed fetching NewsData news:", err);
            setError("Unable to load latest technology news");
        } finally {
            setIsLoading(false);
            setIsLoadingMore(false);
        }
    }, [activeCategory, debouncedSearch]);

    // Trigger fetch on query or category changes
    useEffect(() => {
        fetchNews("", false);
    }, [activeCategory, debouncedSearch, fetchNews]);

    const handleLoadMore = () => {
        if (nextPageToken) {
            fetchNews(nextPageToken, true);
        }
    };

    const handleRetry = () => {
        fetchNews("", false);
    };

    // Stagger animations
    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        show: { 
            opacity: 1, 
            y: 0, 
            transition: { 
                type: "spring", 
                stiffness: 100, 
                damping: 18 
            } 
        }
    };

    // Featured Hero card is the first article, remaining go to the grid
    const featuredArticle = newsItems[0] || null;
    const gridArticles = newsItems.slice(1);

    const formatDate = (dateStr) => {
        if (!dateStr) return "Recently";
        try {
            const d = new Date(dateStr);
            return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
        } catch {
            return dateStr;
        }
    };

    return (
        <section className="py-12 bg-slate-50 dark:bg-[#020617] relative transition-colors duration-300 min-h-[60vh]">
            {/* Background Gradients */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-emerald-500/5 dark:bg-emerald-500/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-cyan-500/5 dark:bg-cyan-500/10 rounded-full blur-[120px]" />
            </div>

            <div className="container mx-auto px-6 max-w-7xl relative z-10">
                {/* Search & Category Header */}
                <div className="flex flex-col gap-8 mb-12">
                    
                    {/* Categories tab container - horizontally scrollable on mobile */}
                    <div className="flex items-center justify-start sm:justify-center gap-2.5 overflow-x-auto whitespace-nowrap scrollbar-none pb-2 sm:pb-0 flex-nowrap sm:flex-wrap border-b border-slate-200/50 dark:border-white/5 pb-4">
                        {CATEGORIES.map((cat) => {
                            const isActive = activeCategory === cat.id;
                            return (
                                <button
                                    key={cat.id}
                                    onClick={() => setActiveCategory(cat.id)}
                                    className={`relative px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer flex-shrink-0 ${
                                        isActive
                                            ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md shadow-emerald-500/20"
                                            : "bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-white/20"
                                    }`}
                                >
                                    {cat.label}
                                </button>
                            );
                        })}
                    </div>

                    {/* Search Panel */}
                    <div className="flex items-center justify-center">
                        <div className="relative w-full max-w-xl">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Search articles by title keywords..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-11 pr-4 py-3 bg-white dark:bg-[#080d19]/80 border border-slate-200 dark:border-white/10 rounded-2xl text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 transition-all shadow-sm"
                            />
                        </div>
                    </div>
                </div>

                {/* Skeletons Loader */}
                {isLoading && (
                    <div className="flex flex-col gap-12">
                        {/* Featured Hero Skeleton */}
                        <div className="w-full h-[400px] bg-white dark:bg-[#080d19]/80 border border-slate-200 dark:border-white/5 rounded-[2.5rem] animate-pulse flex flex-col md:flex-row overflow-hidden shadow-sm">
                            <div className="w-full md:w-1/2 h-full bg-slate-200 dark:bg-slate-800" />
                            <div className="w-full md:w-1/2 p-8 flex flex-col justify-center gap-4">
                                <div className="w-24 h-5 bg-slate-200 dark:bg-slate-800 rounded-full" />
                                <div className="w-3/4 h-8 bg-slate-200 dark:bg-slate-800 rounded-lg" />
                                <div className="w-full h-4 bg-slate-200 dark:bg-slate-800 rounded-lg" />
                                <div className="w-1/2 h-4 bg-slate-200 dark:bg-slate-800 rounded-lg" />
                            </div>
                        </div>

                        {/* Grid Skeletons */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {Array.from({ length: 6 }).map((_, i) => (
                                <div
                                    key={i}
                                    className="bg-white dark:bg-[#080d19]/80 border border-slate-200 dark:border-white/5 rounded-[2.5rem] animate-pulse overflow-hidden flex flex-col h-[420px] shadow-sm"
                                >
                                    <div className="w-full h-48 bg-slate-200 dark:bg-slate-800" />
                                    <div className="p-6 flex flex-col gap-3 flex-1 justify-between">
                                        <div className="flex flex-col gap-3">
                                            <div className="w-20 h-5 bg-slate-200 dark:bg-slate-800 rounded-full" />
                                            <div className="w-full h-6 bg-slate-200 dark:bg-slate-800 rounded-lg" />
                                            <div className="w-3/4 h-4 bg-slate-200 dark:bg-slate-800 rounded-lg" />
                                        </div>
                                        <div className="w-1/3 h-4 bg-slate-200 dark:bg-slate-800 rounded-lg" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Error Banner */}
                {!isLoading && error && (
                    <div className="flex flex-col items-center justify-center py-20 text-center bg-white/70 dark:bg-[#080d19]/60 border border-red-200/50 dark:border-red-500/10 rounded-[2.5rem] p-8 backdrop-blur-md shadow-sm">
                        <AlertTriangle className="w-12 h-12 text-red-500 dark:text-red-400 mb-4 animate-bounce" />
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{error}</h3>
                        <p className="text-slate-500 dark:text-slate-400 mt-2 max-w-sm text-sm">
                            There was an issue loading the latest technology news. Please check your network or try again.
                        </p>
                        <button
                            onClick={handleRetry}
                            className="mt-6 px-6 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-bold text-sm rounded-full hover:scale-[1.03] transition-all flex items-center gap-2 cursor-pointer shadow-md"
                        >
                            <RefreshCw className="w-4 h-4" />
                            <span>Retry Fetching</span>
                        </button>
                    </div>
                )}

                {/* Empty State */}
                {!isLoading && !error && newsItems.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-20 text-center bg-white/70 dark:bg-[#080d19]/60 border border-slate-200/50 dark:border-white/5 rounded-[2.5rem] p-8 backdrop-blur-md shadow-sm">
                        <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center text-3xl mb-4">
                            📰
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white">No News Found</h3>
                        <p className="text-slate-500 dark:text-slate-400 mt-1 max-w-sm text-sm">
                            Try adjusting your filters or keyword query to explore more technology content.
                        </p>
                    </div>
                )}

                {/* Results View */}
                {!isLoading && !error && newsItems.length > 0 && (
                    <div className="flex flex-col gap-12">
                        
                        {/* FEATURED HERO ARTICLE */}
                        {featuredArticle && (
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="w-full flex flex-col lg:flex-row bg-white/80 dark:bg-[#080d19]/80 border border-slate-200/80 dark:border-white/10 rounded-[2.5rem] overflow-hidden hover:shadow-2xl transition-all duration-500 group backdrop-blur-md shadow-lg"
                            >
                                {/* Left Hero Image */}
                                <div className="w-full lg:w-3/5 h-[280px] sm:h-[350px] lg:h-[480px] relative overflow-hidden flex-shrink-0">
                                    <NewsImage
                                        src={featuredArticle.image_url}
                                        alt={featuredArticle.title || "Featured technology article"}
                                        priority={true}
                                        sizes="(max-width: 1024px) 100vw, 60vw"
                                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                                    />
                                    {/* Dark overlay gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/70 via-transparent to-transparent pointer-events-none" />
                                </div>

                                {/* Right Hero Content */}
                                <div className="w-full lg:w-2/5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between text-left">
                                    <div className="flex flex-col gap-4">
                                        
                                        {/* Badge Stats */}
                                        <div className="flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-wider select-none">
                                            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                                                <Globe className="w-3.5 h-3.5" />
                                                <span>{featuredArticle.source_id || "Global"}</span>
                                            </span>
                                            
                                            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-500/10 text-slate-500 dark:text-slate-400 border border-slate-500/20">
                                                <Calendar className="w-3.5 h-3.5" />
                                                <span>{formatDate(featuredArticle.pubDate)}</span>
                                            </span>
                                        </div>

                                        {/* Large Title */}
                                        <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 dark:text-white group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors leading-tight tracking-tight">
                                            {featuredArticle.title}
                                        </h3>

                                        {/* Excerpt Description */}
                                        <p className="text-slate-600 dark:text-gray-400 text-sm sm:text-base leading-relaxed line-clamp-4 lg:line-clamp-6">
                                            {featuredArticle.description || "No description available for this trending technology story. Click view to read the full coverage."}
                                        </p>
                                    </div>

                                    {/* Link button */}
                                    <div className="mt-6 flex items-center justify-between border-t border-slate-100 dark:border-white/5 pt-6">
                                        <a
                                            href={featuredArticle.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="px-6 py-3 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-extrabold text-sm hover:scale-[1.03] transition-all flex items-center gap-2 shadow-sm"
                                        >
                                            <span>Read Article</span>
                                            <ArrowUpRight className="w-4 h-4" />
                                        </a>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* GRID ARTICLES */}
                        {gridArticles.length > 0 && (
                            <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                animate="show"
                                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                            >
                                {gridArticles.map((item, index) => (
                                    <motion.a
                                        key={item.link || index}
                                        variants={itemVariants}
                                        href={item.link || "#"}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex flex-col bg-white/80 dark:bg-[#080d19]/80 border border-slate-200/80 dark:border-white/10 rounded-[2.5rem] overflow-hidden hover:shadow-2xl hover:border-emerald-500/20 dark:hover:border-emerald-400/20 transition-all duration-500 group shadow-lg backdrop-blur-md h-[430px]"
                                    >
                                        {/* Card Image */}
                                        <div className="w-full h-48 relative overflow-hidden flex-shrink-0">
                                            <NewsImage
                                                src={item.image_url}
                                                alt={item.title || "Technology article thumbnail"}
                                                priority={false}
                                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                                            />
                                        </div>

                                        {/* Card Content */}
                                        <div className="p-6 flex flex-col justify-between flex-1 text-left">
                                            <div className="flex flex-col gap-2.5">
                                                {/* Meta details */}
                                                <div className="flex flex-wrap items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                                                    <span className="text-emerald-500 dark:text-emerald-400">{item.source_id || "Web"}</span>
                                                    <span>•</span>
                                                    <span>{formatDate(item.pubDate)}</span>
                                                </div>

                                                {/* Title */}
                                                <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white line-clamp-2 leading-snug group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors tracking-tight">
                                                    {item.title}
                                                </h4>

                                                {/* Excerpt */}
                                                <p className="text-slate-600 dark:text-gray-400 text-xs sm:text-sm line-clamp-3 leading-relaxed">
                                                    {item.description || "Click to open and read full article coverage on the original host."}
                                                </p>
                                            </div>

                                            {/* Link arrow */}
                                            <div className="flex items-center justify-between border-t border-slate-100 dark:border-white/5 pt-4 mt-3">
                                                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors flex items-center gap-1">
                                                    <span>Read Article</span>
                                                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                                </span>
                                            </div>
                                        </div>
                                    </motion.a>
                                ))}
                            </motion.div>
                        )}
                        
                    </div>
                )}

                {/* Load More Button */}
                {!isLoading && !error && newsItems.length > 0 && nextPageToken && (
                    <div className="mt-12 text-center">
                        <button
                            onClick={handleLoadMore}
                            disabled={isLoadingMore}
                            className="px-8 py-3 bg-white dark:bg-white/5 border border-slate-300 dark:border-white/10 text-slate-800 dark:text-white font-bold rounded-full hover:bg-slate-100 dark:hover:bg-white/10 transition-all flex items-center gap-2 mx-auto disabled:opacity-50 hover:scale-[1.02] cursor-pointer shadow-md hover:shadow-lg"
                        >
                            {isLoadingMore ? (
                                <RefreshCw className="w-4 h-4 animate-spin" />
                            ) : (
                                <span>Load More Technology Stories</span>
                            )}
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}
