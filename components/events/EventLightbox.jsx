"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X, Download, Maximize2, Minimize2, ZoomIn, ZoomOut } from "lucide-react";

export default function EventLightbox({ images, currentIndex, onClose, onPrev, onNext }) {
    const [isDownloading, setIsDownloading] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isZoomed, setIsZoomed] = useState(false);

    // Touch Swipe Gestures
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);
    const minSwipeDistance = 50;

    const handleTouchStart = (e) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    };

    const handleTouchMove = (e) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const handleTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;
        
        if (isLeftSwipe) {
            onNext();
        } else if (isRightSwipe) {
            onPrev();
        }
    };

    // Fullscreen API toggle
    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().then(() => {
                setIsFullscreen(true);
            }).catch((err) => {
                console.error("Error enabling fullscreen:", err);
            });
        } else {
            document.exitFullscreen();
            setIsFullscreen(false);
        }
    };

    // Keep fullscreen state synced if user exits via browser buttons
    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };
        document.addEventListener("fullscreenchange", handleFullscreenChange);
        return () => {
            document.removeEventListener("fullscreenchange", handleFullscreenChange);
        };
    }, []);

    // Reset zoom state on image index change
    useEffect(() => {
        setIsZoomed(false);
    }, [currentIndex]);

    // Keyboard handlers
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "ArrowLeft") {
                onPrev();
            } else if (e.key === "ArrowRight") {
                onNext();
            } else if (e.key === "Escape") {
                onClose();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "hidden";

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "unset";
        };
    }, [onPrev, onNext, onClose]);

    if (!images || images.length === 0 || currentIndex === null || currentIndex === undefined) {
        return null;
    }

    const currentImg = images[currentIndex];

    const slideVariants = {
        enter: {
            scale: 0.95,
            opacity: 0
        },
        center: {
            scale: 1,
            opacity: 1
        },
        exit: {
            scale: 0.95,
            opacity: 0
        }
    };

    const handlePrev = () => {
        onPrev();
    };

    const handleNext = () => {
        onNext();
    };

    const handleDownload = async () => {
        if (!currentImg?.image) return;
        setIsDownloading(true);
        try {
            const response = await fetch(currentImg.image);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            const filename = currentImg.image.split("/").pop() || `${currentImg.title || "image"}.jpg`;
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (err) {
            console.error("Failed to download image:", err);
            window.open(currentImg.image, "_blank");
        } finally {
            setIsDownloading(false);
        }
    };

    return (
        <div 
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex flex-col items-center justify-center select-none"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            {/* Top Toolbar */}
            <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-[110]">
                {/* Counter */}
                <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/70 text-sm font-semibold tracking-wider">
                    {currentIndex + 1} / {images.length}
                </div>

                {/* Toolbar Actions */}
                <div className="flex items-center gap-3">
                    {/* Zoom Toggle */}
                    <button
                        onClick={() => setIsZoomed(!isZoomed)}
                        className="p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all duration-300 hover:scale-105 cursor-pointer"
                        title={isZoomed ? "Zoom Out" : "Zoom In"}
                        aria-label="Toggle Zoom"
                    >
                        {isZoomed ? <ZoomOut size={20} /> : <ZoomIn size={20} />}
                    </button>

                    {/* Fullscreen Toggle */}
                    <button
                        onClick={toggleFullscreen}
                        className="p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all duration-300 hover:scale-105 cursor-pointer"
                        title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
                        aria-label="Toggle Fullscreen"
                    >
                        {isFullscreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
                    </button>

                    {/* Download Button */}
                    <button
                        onClick={handleDownload}
                        disabled={isDownloading}
                        className="p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all duration-300 hover:scale-105 disabled:opacity-50 cursor-pointer"
                        title="Download Image"
                        aria-label="Download Image"
                    >
                        <Download size={20} className={isDownloading ? "animate-pulse" : ""} />
                    </button>

                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all duration-300 hover:scale-105 cursor-pointer"
                        title="Close Lightbox"
                        aria-label="Close Lightbox"
                    >
                        <X size={20} />
                    </button>
                </div>
            </div>

            {/* Content Area */}
            <div className="relative w-full max-w-6xl h-[75vh] flex items-center justify-center px-4 md:px-12">
                {/* Prev Button */}
                {images.length > 1 && !isZoomed && (
                    <button
                        onClick={handlePrev}
                        className="absolute left-4 md:left-6 z-[110] p-3 md:p-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all duration-300 hover:scale-110 cursor-pointer"
                        aria-label="Previous Image"
                    >
                        <ChevronLeft size={24} />
                    </button>
                )}

                {/* Image Container with AnimatePresence */}
                <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
                    <AnimatePresence initial={false} mode="wait">
                        <motion.div
                            key={currentIndex}
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="relative max-w-full max-h-full aspect-auto flex flex-col items-center justify-center"
                        >
                            <div 
                                onClick={() => setIsZoomed(!isZoomed)}
                                className={`relative max-w-full max-h-[65vh] w-auto h-auto flex justify-center overflow-hidden transition-all duration-300 ease-in-out ${
                                    isZoomed ? "overflow-auto scale-150 z-20 cursor-zoom-out" : "cursor-zoom-in"
                                }`}
                            >
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={currentImg.image}
                                    alt={currentImg.title || "Lightbox view"}
                                    className="max-w-full max-h-[65vh] object-contain rounded-2xl shadow-2xl border border-white/5 select-none"
                                    draggable={false}
                                />
                            </div>
                            
                            {/* Title overlay */}
                            {currentImg.title && !isZoomed && (
                                <motion.p 
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-white/90 text-base font-bold mt-6 text-center px-6 drop-shadow-md tracking-tight"
                                >
                                    {currentImg.title}
                                </motion.p>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Next Button */}
                {images.length > 1 && !isZoomed && (
                    <button
                        onClick={handleNext}
                        className="absolute right-4 md:right-6 z-[110] p-3 md:p-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all duration-300 hover:scale-110 cursor-pointer"
                        aria-label="Next Image"
                    >
                        <ChevronRight size={24} />
                    </button>
                )}
            </div>
        </div>
    );
}
