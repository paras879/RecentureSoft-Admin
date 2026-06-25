"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

// ── High Performance SVG Graphics for Services ──

function SoftwareDevGraphic({ activeSlide = 0 }) {
    return (
        <div className="w-full h-full flex items-center justify-center p-4">
            <div className="relative w-full max-w-[320px] md:max-w-[420px] lg:max-w-[550px] flex flex-col items-center group">
                <div className="w-full aspect-[16/10] bg-slate-800 rounded-t-xl md:rounded-t-2xl border-[6px] border-slate-800 shadow-2xl overflow-hidden relative z-10">
                    <div className={`absolute inset-0 transition-opacity duration-700 ease-in-out z-10 ${activeSlide === 0 ? 'opacity-100' : 'opacity-0'}`}>
                        <Image src="/software-1.png" alt="Software Mockup 1" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover object-top block" />
                    </div>
                    <div className={`absolute inset-0 transition-opacity duration-700 ease-in-out z-20 ${activeSlide === 1 ? 'opacity-100' : 'opacity-0'}`}>
                        <Image src="/software-2.png" alt="Software Mockup 2" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover object-top block" />
                    </div>
                </div>
                {/* Laptop Base */}
                <div className="w-[115%] h-3 md:h-4 bg-slate-300 dark:bg-slate-700 rounded-b-xl md:rounded-b-2xl shadow-xl relative z-20 border-t border-slate-400 dark:border-slate-600 flex justify-center">
                    <div className="w-1/4 h-1 md:h-1.5 bg-slate-400 dark:bg-slate-500 rounded-b-md" />
                </div>
            </div>
        </div>
    );
}

function WebDevGraphic({ activeSlide = 0 }) {
    return (
        <div className="w-full h-full flex items-center justify-center p-4">
            <div className="relative w-full max-w-[320px] md:max-w-[420px] lg:max-w-[550px] flex flex-col items-center group">
                <div className="w-full aspect-[16/10] bg-slate-800 rounded-t-xl md:rounded-t-2xl border-[6px] border-slate-800 shadow-2xl overflow-hidden relative z-10">
                    <div className={`absolute inset-0 transition-opacity duration-700 ease-in-out z-10 ${activeSlide === 0 ? 'opacity-100' : 'opacity-0'}`}>
                        <Image src="/desktop-mockup.png" alt="Desktop Mockup 1" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover object-top block" />
                    </div>
                    <div className={`absolute inset-0 transition-opacity duration-700 ease-in-out z-20 ${activeSlide === 1 ? 'opacity-100' : 'opacity-0'}`}>
                        <Image src="/desktop-mockup-1.png" alt="Desktop Mockup 2" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover object-top block" />
                    </div>
                </div>
                {/* Laptop Base */}
                <div className="w-[115%] h-3 md:h-4 bg-slate-300 dark:bg-slate-700 rounded-b-xl md:rounded-b-2xl shadow-xl relative z-20 border-t border-slate-400 dark:border-slate-600 flex justify-center">
                    <div className="w-1/4 h-1 md:h-1.5 bg-slate-400 dark:bg-slate-500 rounded-b-md" />
                </div>
            </div>
        </div>
    );
}

function MobileAppGraphic({ activeSlide = 0 }) {
    return (
        <div className="w-full h-full flex items-center justify-center p-4">
            <div className="relative w-[110px] md:w-[130px] aspect-[9/19] bg-slate-900 rounded-[2rem] border-[6px] md:border-[8px] border-slate-900 shadow-2xl overflow-hidden group">
                {/* iPhone Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[45%] h-4 md:h-5 bg-slate-900 rounded-b-xl z-20" />
                
                <div className="w-full h-full relative z-10">
                    <div className={`absolute inset-0 transition-opacity duration-700 ease-in-out z-10 ${activeSlide === 0 ? 'opacity-100' : 'opacity-0'}`}>
                        <Image src="/mobile-mockup.png" alt="Mobile Mockup 1" fill sizes="(max-width: 768px) 100vw, 30vw" className="object-cover object-top block" />
                    </div>
                    <div className={`absolute inset-0 transition-opacity duration-700 ease-in-out z-20 ${activeSlide === 1 ? 'opacity-100' : 'opacity-0'}`}>
                        <Image src="/mobile-mockup-1.png" alt="Mobile Mockup 2" fill sizes="(max-width: 768px) 100vw, 30vw" className="object-cover object-top block" />
                    </div>
                </div>
            </div>
        </div>
    );
}

function DigitalMarketingGraphic() {
    return (
        <div className="w-full h-full flex items-center justify-center p-4">
            <div className="relative w-full max-w-[320px] md:max-w-[420px] flex flex-col items-center group">
                <div className="w-full aspect-[16/10] bg-slate-800 rounded-t-xl md:rounded-t-2xl border-[6px] border-slate-800 shadow-2xl overflow-hidden relative z-10">
                    <div className="absolute inset-0 z-10">
                        <Image src="/marketing.png" alt="Marketing Mockup" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover object-top block" />
                    </div>
                </div>
                {/* Laptop Base */}
                <div className="w-[115%] h-3 md:h-4 bg-slate-300 dark:bg-slate-700 rounded-b-xl md:rounded-b-2xl shadow-xl relative z-20 border-t border-slate-400 dark:border-slate-600 flex justify-center">
                    <div className="w-1/4 h-1 md:h-1.5 bg-slate-400 dark:bg-slate-500 rounded-b-md" />
                </div>
            </div>
        </div>
    );
}

const services = [
    {
        category: "Enterprise Engineering",
        title: "Software & Dashboards",
        desc: "Bespoke admin panels, CRM systems, and business intelligence dashboards designed to streamline your daily operations.",
        tags: ["Dashboards", "CRM", "Portals", "React"],
        Scene: SoftwareDevGraphic,
        colSpan: "lg:col-span-7",
        color: "cyan",
        accent: "from-cyan-500/20 to-blue-500/20"
    },
    {
        category: "Growth Intelligence",
        title: "Digital Marketing & SEO",
        desc: "Data-driven marketing, SEO optimization, and high-conversion landing pages to scale your business visibility locally and globally.",
        tags: ["SEO", "Marketing", "Ads", "Conversion"],
        Scene: DigitalMarketingGraphic,
        colSpan: "lg:col-span-5",
        color: "teal",
        accent: "from-teal-500/20 to-emerald-500/20"
    },
    {
        category: "Mobile Ecosystem",
        title: "Mobile-First Booking Apps",
        desc: "Flawless mobile experiences that allow customers to easily book services, check availability, and interact with your business seamlessly on the go.",
        tags: ["Mobile First", "Cross-Platform", "UX/UI Design", "Web Apps"],
        Scene: MobileAppGraphic,
        colSpan: "lg:col-span-5",
        color: "purple",
        accent: "from-purple-500/20 to-fuchsia-500/20"
    },
    {
        category: "Digital Experience",
        title: "Custom Web Platforms",
        desc: "Tailored web platforms with integrated booking systems. We build responsive, accessible, and highly optimized websites that drive conversions and local growth.",
        tags: ["E-Commerce", "Booking Systems", "Performance", "Custom UI"],
        Scene: WebDevGraphic,
        colSpan: "lg:col-span-7",
        color: "blue",
        accent: "from-blue-500/20 to-indigo-500/20"
    }
];

function ServiceCard({ service, activeSlide }) {
    // Tailwind classes for dynamic hover shadows
    const shadowColors = {
        cyan: "dark:hover:shadow-[0_0_40px_-10px_rgba(34,211,238,0.15)] hover:shadow-[0_20px_40px_-15px_rgba(34,211,238,0.2)]",
        blue: "dark:hover:shadow-[0_0_40px_-10px_rgba(59,130,246,0.15)] hover:shadow-[0_20px_40px_-15px_rgba(59,130,246,0.2)]",
        purple: "dark:hover:shadow-[0_0_40px_-10px_rgba(168,85,247,0.15)] hover:shadow-[0_20px_40px_-15px_rgba(168,85,247,0.2)]",
        teal: "dark:hover:shadow-[0_0_40px_-10px_rgba(20,184,166,0.15)] hover:shadow-[0_20px_40px_-15px_rgba(20,184,166,0.2)]"
    };

    return (
        <div
            className={`group relative flex flex-col lg:flex-row justify-between overflow-hidden rounded-[1.5rem] md:rounded-[2rem] bg-white/40 dark:bg-white/[0.015] border border-slate-200 dark:border-white/5 backdrop-blur-xl p-4 md:p-5 lg:p-8 ${service.colSpan} hover:bg-white/80 dark:hover:bg-white/[0.03] hover:-translate-y-2 transition-all duration-700 ease-out shadow-sm ${shadowColors[service.color]}`}
        >
            {/* Subtle Gradient Wash */}
            <div className={`pointer-events-none absolute inset-0 rounded-[1.5rem] md:rounded-[2rem] border-[1.5px] border-transparent group-hover:border-slate-300 dark:group-hover:border-white/20 transition-all duration-700 bg-gradient-to-br ${service.accent} opacity-0 group-hover:opacity-[0.03]`} />

            {/* Content Left/Top */}
            <div
                className="relative z-10 flex flex-col gap-3 w-full lg:w-1/2 justify-center transition-all duration-700 ease-out group-hover:translate-x-2 group-hover:-translate-y-1"
            >

                <h3 className="text-[1.4rem] md:text-[1.8rem] lg:text-[2rem] font-[600] text-slate-900 dark:text-white tracking-[-0.03em] leading-[1.1] transition-colors duration-500">{service.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-[0.95rem] md:text-base leading-7 font-[400] mt-2 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors duration-500">{service.desc}</p>

                <div className="flex flex-wrap gap-2 mt-4">
                    {service.tags.map((tag, idx) => (
                        <span key={idx} className="px-3 py-1.5 rounded-lg bg-white/80 dark:bg-[#020617]/50 border border-slate-200 dark:border-white/10 text-[11px] md:text-xs text-slate-700 dark:text-slate-300 font-[500] tracking-wide group-hover:border-slate-300 dark:group-hover:border-white/20 transition-all duration-500">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            {/* 3D Scene / Mockup Right/Bottom */}
            <div
                className="relative z-0 h-[180px] md:h-[220px] lg:h-[350px] w-full lg:w-1/2 flex items-center justify-center pointer-events-none mt-6 md:mt-0 transition-transform duration-700 ease-out group-hover:scale-[1.03] group-hover:-translate-y-2 group-hover:-translate-x-1"
            >
                {/* Fallback glow behind the 3D model */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.accent} blur-[60px] opacity-10 group-hover:opacity-30 transition-opacity duration-700`} />
                <service.Scene activeSlide={activeSlide} />
            </div>
        </div>
    );
}

export default function EnterpriseServices() {
    const [activeSlide, setActiveSlide] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveSlide(prev => (prev === 0 ? 1 : 0));
        }, 4000); // Wait 4s between switches for better viewability
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="font-manrope relative w-full py-[clamp(0.5rem,2vw,1rem)] bg-background px-4 md:px-8 lg:px-12 transition-colors duration-300">
            <style>{`
                /* No additional animations needed, standard React transitions handle the crossfade */
            `}</style>
            <div className="max-w-[1400px] mx-auto flex flex-col gap-4">

                {/* Section Header */}
                <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
                    <h2
                        className="text-[2rem] md:text-[3rem] lg:text-[4.5rem] font-[600] text-foreground mb-1 tracking-[-0.04em] leading-[1.05]"
                    >
                        Enterprise <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600 dark:from-cyan-400 dark:to-blue-500">Solutions</span>
                    </h2>
                    <p
                        className="text-[0.95rem] md:text-base lg:text-lg text-slate-600 dark:text-slate-400 font-[400] leading-7 max-w-2xl"
                    >
                        Scalable architecture built for the modern web. We transform complex problems into elegant, high-performance digital products.
                    </p>
                </div>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-[clamp(1.25rem,2.5vw,2rem)] auto-rows-fr perspective-1000">
                    {services.map((service, idx) => (
                        <ServiceCard key={idx} service={service} activeSlide={activeSlide} />
                    ))}
                </div>
            </div>
        </section>
    );
}
