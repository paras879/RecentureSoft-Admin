"use client";

import { useState, useRef } from "react";

export default function Transformations() {
    const [sliderPos, setSliderPos] = useState(55);
    const containerRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);

    const handleMove = (clientX) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
        const percentage = (x / rect.width) * 100;
        setSliderPos(percentage);
    };

    const onMouseMove = (e) => {
        if (!isDragging) return;
        handleMove(e.clientX);
    };

    const onTouchMove = (e) => {
        if (!isDragging) return;
        handleMove(e.touches[0].clientX);
    };

    return (
        <section className="pt-10 pb-4 md:pt-14 md:pb-8 lg:pt-20 lg:pb-10 bg-background transition-colors duration-300">
            <div className="container mx-auto px-5 sm:px-8 lg:px-12 max-w-[1100px] xl:max-w-[1200px]">
                <div className="text-center mb-8 md:mb-12">
                    <h2 className="text-[2rem] sm:text-[2.5rem] md:text-[2.8rem] lg:text-[3rem] font-[600] text-foreground leading-[1.05] tracking-[-0.04em] mb-4">Digital Transformations</h2>
                    <p className="text-slate-600 dark:text-slate-300 text-[0.95rem] md:text-[1rem] lg:text-lg leading-7 md:leading-8 max-w-xl md:max-w-2xl mx-auto ">Compare legacy systems with modern digital experiences and discover how strategic engineering transforms performance, scalability, and user engagement.</p>
                </div>

                <div
                    ref={containerRef}
                    className="relative w-full h-[220px] sm:h-[300px] md:h-[360px] lg:h-[520px] rounded-2xl md:rounded-3xl overflow-hidden cursor-ew-resize select-none border border-slate-200 dark:border-white/10 shadow-premium dark:shadow-[0_20px_60px_rgba(0,0,0,0.4)]"
                    onMouseDown={(e) => { setIsDragging(true); handleMove(e.clientX); }}
                    onMouseUp={() => setIsDragging(false)}
                    onMouseLeave={() => setIsDragging(false)}
                    onMouseMove={onMouseMove}
                    onTouchStart={(e) => { setIsDragging(true); handleMove(e.touches[0].clientX); }}
                    onTouchEnd={() => setIsDragging(false)}
                    onTouchCancel={() => setIsDragging(false)}
                    onTouchMove={onTouchMove}
                >
                    {/* Before Image (Background) */}
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center grayscale opacity-50" />
                    <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1.5 md:px-3 md:py-1.5 lg:px-4 lg:py-2 rounded-full border border-white/10">
                        <span className="text-white text-xs md:text-sm font-semibold tracking-wider uppercase">Legacy</span>
                    </div>

                    {/* After Image (Clipped) */}
                    <div
                        className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center"
                        style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
                    />
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-cyan-500 to-blue-500 backdrop-blur-md px-3 py-1.5 md:px-3 md:py-1.5 lg:px-4 lg:py-2 rounded-full border border-cyan-400/50 z-20">
                        <span className="text-white text-xs md:text-sm font-semibold tracking-wider uppercase">Modernized</span>
                    </div>

                    {/* Slider Line & Handle */}
                    <div
                        className="absolute top-0 bottom-0 w-[3px] md:w-1 bg-white shadow-[0_0_30px_rgba(6,182,212,0.7)] z-30"
                        style={{ left: `calc(${sliderPos}% - 2px)` }}
                    >
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 md:w-11 md:h-11 lg:w-12 lg:h-12  bg-white rounded-full flex items-center justify-center shadow-xl border-2 border-cyan-500">
                            <svg className="w-4 h-4 text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
