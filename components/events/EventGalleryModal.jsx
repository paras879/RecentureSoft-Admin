"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import EventYearSelector from "./EventYearSelector";
import EventMasonryGrid from "./EventMasonryGrid";
import EventLightbox from "./EventLightbox";

export default function EventGalleryModal({ isOpen, onClose, event }) {
    const [years, setYears] = useState([]);
    const [selectedYear, setSelectedYear] = useState(null);
    const [images, setImages] = useState([]);
    const [isYearsLoading, setIsYearsLoading] = useState(false);
    const [isImagesLoading, setIsImagesLoading] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(null);

    // Fetch years when modal is open and event changes
    useEffect(() => {
        if (!isOpen || !event?.slug) return;

        const fetchYears = async () => {
            setIsYearsLoading(true);
            try {
                const res = await fetch(`/api/events/gallery?slug=${event.slug}`);
                const data = await res.json();
                if (Array.isArray(data)) {
                    setYears(data);
                    if (data.length > 0) {
                        setSelectedYear(data[0]); // Select first year by default
                    } else {
                        setSelectedYear(null);
                        setImages([]);
                    }
                }
            } catch (err) {
                console.error("Failed to fetch event years:", err);
            } finally {
                setIsYearsLoading(false);
            }
        };

        fetchYears();
    }, [isOpen, event?.slug]);

    // Fetch images when selectedYear or event.slug changes
    useEffect(() => {
        if (!event?.slug || !selectedYear) return;

        const fetchImages = async () => {
            setIsImagesLoading(true);
            try {
                const res = await fetch(`/api/events/gallery?slug=${event.slug}&year=${selectedYear}`);
                const data = await res.json();
                if (Array.isArray(data)) {
                    setImages(data);
                } else {
                    setImages([]);
                }
            } catch (err) {
                console.error("Failed to fetch gallery images:", err);
            } finally {
                setIsImagesLoading(false);
            }
        };

        fetchImages();
    }, [event?.slug, selectedYear]);

    // Handle lightbox navigation
    const handlePrev = () => {
        if (images.length === 0) return;
        setLightboxIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const handleNext = () => {
        if (images.length === 0) return;
        setLightboxIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    // Close on overlay click
    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div 
                onClick={handleOverlayClick}
                className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/40 dark:bg-black/80 backdrop-blur-xl flex items-start justify-center p-4 md:p-6 lg:p-10 pt-16 md:pt-20 lg:pt-28"
            >
                {/* Modal Container */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.96, y: 30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96, y: 30 }}
                    transition={{ type: "spring", duration: 0.5, bounce: 0.15 }}
                    className="relative w-full max-w-7xl h-auto max-h-[85vh] md:max-h-[88vh] mt-2 flex flex-col bg-white/90 dark:bg-[#080d19]/90 border border-slate-200/80 dark:border-white/10 rounded-[2.5rem] shadow-[0_30px_100px_rgba(0,0,0,0.2)] dark:shadow-[0_30px_100px_rgba(0,0,0,0.5)] overflow-hidden backdrop-blur-2xl"
                >
                    {/* Floating Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-6 right-6 md:top-8 md:right-8 p-3 rounded-full hover:bg-slate-200/50 dark:hover:bg-white/10 border border-slate-200/60 dark:border-white/10 text-slate-700 dark:text-slate-300 transition-all hover:scale-105 cursor-pointer bg-white/40 dark:bg-[#080d19]/40 shadow-sm backdrop-blur-sm flex items-center justify-center z-40"
                        title="Close Gallery Modal"
                        aria-label="Close Gallery Modal"
                    >
                        <X size={20} />
                    </button>

                    {/* Glassmorphism Header */}
                    <div className="relative flex flex-col px-8 py-8 md:px-12 md:py-10 border-b border-slate-100 dark:border-white/5 bg-white/60 dark:bg-[#080d19]/60 backdrop-blur-md z-30 pr-16 md:pr-20">
                        <div>
                            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-none font-sans">
                                {event?.title || "Event Gallery"}
                            </h2>
                            
                            {/* Badges */}
                            <div className="flex flex-wrap items-center gap-2 mt-4 select-none">
                                {event?.date && (
                                    <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold bg-cyan-500/10 dark:bg-cyan-400/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 dark:border-cyan-400/20 shadow-sm">
                                        📅 {event.date}
                                    </span>
                                )}
                                {event?.location && (
                                    <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold bg-purple-500/10 dark:bg-purple-400/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 dark:border-purple-400/20 shadow-sm">
                                        📍 {event.location}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Sticky Year Selector */}
                    {years.length > 0 && (
                        <div className="sticky top-0 z-20 bg-white/70 dark:bg-[#080d19]/80 backdrop-blur-md px-8 py-4 md:px-12 border-b border-slate-100 dark:border-white/5">
                            <EventYearSelector
                                years={years}
                                selectedYear={selectedYear}
                                onSelectYear={setSelectedYear}
                            />
                        </div>
                    )}

                    {/* Scrollable Content Grid */}
                    <div className="flex-1 overflow-y-auto px-8 py-8 md:px-12 md:py-10 min-h-[300px] flex flex-col">
                        {isYearsLoading ? (
                            <div className="flex-1 flex flex-col items-center justify-center py-20">
                                <div className="w-10 h-10 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mb-4" />
                                <span className="text-slate-600 dark:text-slate-400 text-sm font-medium">
                                    Loading years...
                                </span>
                            </div>
                        ) : (
                            <div className="flex-1">
                                <EventMasonryGrid
                                    images={images}
                                    isLoading={isImagesLoading}
                                    onSelectImage={setLightboxIndex}
                                />
                            </div>
                        )}
                    </div>
                </motion.div>

                {/* Fullscreen Lightbox Overlay */}
                <EventLightbox
                    images={images}
                    currentIndex={lightboxIndex}
                    onClose={() => setLightboxIndex(null)}
                    onPrev={handlePrev}
                    onNext={handleNext}
                />
            </div>
        </AnimatePresence>
    );
}
