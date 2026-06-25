"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { CheckCircle } from "lucide-react";

// Elegant, high-performance SVG tech orbit background to replace 3D canvas
function TechOrbitBackground() {
    return (
        <div className="absolute inset-0 z-0 pointer-events-none opacity-25 dark:opacity-35 flex items-center justify-center">
            <svg viewBox="0 0 500 500" className="w-full h-full max-w-[550px] animate-orbit-slow" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="250" cy="250" r="220" stroke="url(#orbit-grad-1)" strokeWidth="1" strokeDasharray="3 6" />
                <circle cx="250" cy="250" r="160" stroke="url(#orbit-grad-2)" strokeWidth="1.5" />
                <circle cx="250" cy="250" r="100" stroke="url(#orbit-grad-1)" strokeWidth="1" strokeDasharray="10 10" />

                {/* Tech node points */}
                <circle cx="250" cy="30" r="6" fill="#06b6d4" className="animate-pulse" />
                <circle cx="90" cy="250" r="4" fill="#6366f1" />
                <circle cx="410" cy="250" r="5" fill="#a855f7" />
                <circle cx="250" cy="410" r="4" fill="#0ea5e9" />
                
                {/* Connecting lines */}
                <path d="M 250 30 L 250 410 M 90 250 L 410 250" stroke="rgba(99, 102, 241, 0.08)" strokeWidth="1" />
                <path d="M 137 137 L 363 363" stroke="rgba(6, 182, 212, 0.08)" strokeWidth="1" />

                <defs>
                    <linearGradient id="orbit-grad-1" x1="0" y1="0" x2="500" y2="500" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#06b6d4" stopOpacity="0.2" />
                        <stop offset="0.5" stopColor="#6366f1" stopOpacity="0.8" />
                        <stop offset="1" stopColor="#a855f7" stopOpacity="0.2" />
                    </linearGradient>
                    <linearGradient id="orbit-grad-2" x1="500" y1="0" x2="0" y2="500" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#6366f1" stopOpacity="0.6" />
                        <stop offset="1" stopColor="#06b6d4" stopOpacity="0.1" />
                    </linearGradient>
                </defs>
            </svg>
            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes orbit-spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .animate-orbit-slow {
                    animation: orbit-spin 45s linear infinite;
                    will-change: transform;
                }
            `}} />
        </div>
    );
}

// ── 3D Mouse Tilting Card Component ───────────────────────────────
function TiltCard({ children, className }) {
    return (
        <div
            className={`cursor-pointer hover:-translate-y-2 hover:scale-[1.02] transition-all duration-500 ${className}`}
        >
            <div className="h-full w-full relative">
                {children}
            </div>
        </div>
    );
}

export default function AboutSection() {
    const [isLargeScreen, setIsLargeScreen] = useState(false);
    useEffect(() => {
        setIsLargeScreen(window.innerWidth >= 1024);
    }, []);

    return (
        <section id="aboutUs" className="relative py-[clamp(1.5rem,4vw,4.5rem)] bg-background transition-colors duration-300 overflow-hidden select-none">
            {/* Ambient background glows */}
            <div className="absolute top-1/4 left-1/4 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-cyan-500/5 blur-[100px] md:blur-[160px] rounded-full pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-indigo-600/5 blur-[100px] md:blur-[160px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-12 relative z-10">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-20 items-center">

                    {/* Left Content Column */}
                    <div>


                        {/* Title */}
                        <h2
                            className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] font-bold leading-tight text-foreground tracking-tight"
                        >
                            <span className="block md:whitespace-nowrap">Software Development</span>
                            <span className="block bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">
                                & Digital Innovation
                            </span>
                            <span className="block md:whitespace-nowrap">For Modern Businesses</span>
                        </h2>

                        {/* Description */}
                        <p
                            className="mt-4 text-sm md:text-base lg:text-lg text-slate-600 dark:text-gray-400 leading-relaxed"
                        >
                            At RecentureSoft, we create powerful digital experiences through custom software development,
                            cloud solutions, AI integration, and scalable web applications that help businesses accelerate growth.
                        </p>

                        {/* Features checklist */}
                        <div className="mt-6 space-y-3 md:space-y-4">
                            {[
                                "Enterprise Web Applications",
                                "Mobile App Development",
                                "Cloud & DevOps Solutions",
                                "AI & Automation Services",
                            ].map((item) => (
                                <div key={item} className="flex items-start md:items-center gap-3 group">
                                    <CheckCircle size={20} className="text-cyan-400 group-hover:scale-110 transition duration-300 mt-0.5 md:mt-0 flex-shrink-0" />
                                    <span className="text-slate-600 dark:text-gray-300 group-hover:text-slate-900 dark:group-hover:text-cyan-300 transition duration-300 text-sm md:text-base">
                                        {item}
                                    </span>
                                </div>
                            ))}
                        </div>



                        {/* CTA Buttons */}
                        <div className="mt-6 md:mt-8 flex flex-col sm:flex-row gap-4">
                            <button className="w-full sm:w-auto px-6 md:px-8 py-3.5 md:py-4 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold shadow-lg shadow-cyan-500/20 hover:scale-105 transition duration-300 text-center">
                                Get Started
                            </button>
                            <button className="w-full sm:w-auto px-6 md:px-8 py-3.5 md:py-4 rounded-full border border-slate-300 dark:border-white/10 text-slate-800 dark:text-white hover:bg-slate-100 dark:hover:bg-white/5 hover:border-cyan-400/40 transition duration-300 text-center">
                                Learn More
                            </button>
                        </div>
                    </div>

                    {/* Right Column (3D Interactive Tilt Cards + Three.js Background) */}
                    {isLargeScreen && (
                        <div className="relative h-[560px] hidden lg:block perspective-[1500px]">
                            {/* Background Tech Orbits */}
                            <TechOrbitBackground />

                            {/* Image Card 1 */}
                            <TiltCard className="absolute top-0 right-0 w-[320px] h-[210px] z-10 rounded-3xl overflow-hidden border border-slate-200 dark:border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.15)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                                <Image
                                    src="/about/about1.jpg"
                                    alt="Innovative digital workspace"
                                    fill
                                    sizes="(max-width: 768px) 100vw, 400px"
                                    className="object-cover"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            </TiltCard>

                            {/* Image Card 2 */}
                            <TiltCard className="absolute top-[160px] left-0 w-[290px] h-[210px] z-20 rounded-3xl overflow-hidden border border-slate-200 dark:border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.15)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                                <Image
                                    src="/about/about2.jpg"
                                    alt="Advanced Cloud infrastructure"
                                    fill
                                    sizes="(max-width: 768px) 100vw, 400px"
                                    className="object-cover"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            </TiltCard>

                            {/* Image Card 3 */}
                            <TiltCard className="absolute bottom-0 right-12 w-[310px] h-[210px] z-10 rounded-3xl overflow-hidden border border-slate-200 dark:border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.15)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                                <Image
                                    src="/about/about3.jpg"
                                    alt="AI and data integrations"
                                    fill
                                    sizes="(max-width: 768px) 100vw, 400px"
                                    className="object-cover"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            </TiltCard>


                        </div>
                    )}

                </div>
            </div>
        </section>
    );
}