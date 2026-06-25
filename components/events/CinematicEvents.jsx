"use client";

import { useState } from "react";
import Image from "next/image";
import { Globe, Award, Users, Building } from "lucide-react";
import EventGalleryModal from "./EventGalleryModal";

// ==========================================
// STATIC IMAGES & ASSETS
// ==========================================
const IMAGES = {
    hero: "/images/events/hero.jpg",
    videoThumb: "/images/events/video_thumb.jpg",
    marquee: [
        "/images/events/marquee_0.jpg",
        "/images/events/marquee_1.jpg",
        "/images/events/marquee_2.jpg",
        "/images/events/marquee_3.jpg",
        "/images/events/bento_0.jpg"
    ],
    testimonials: [
        "/images/events/testimonial_0.jpg",
        "/images/events/testimonial_1.jpg",
        "/images/events/testimonial_2.jpg"
    ]
};

// ==========================================
// SECTION 1: HERO
// ==========================================
function EventsHero() {
    return (
        <section className="relative min-h-[auto] lg:min-h-[50vh] w-full flex flex-col items-center justify-center pt-20 md:pt-24 lg:pt-28 pb-2 md:pb-3 overflow-hidden bg-slate-50 dark:bg-[#020617] px-6 lg:px-12 transition-colors duration-300">
            {/* Gradient Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-cyan-900/20 rounded-full blur-[120px]" />
                <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[120px]" />
            </div>

            <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-5xl">
                <h1 className="text-[clamp(2rem,6vw,5rem)] font-extrabold text-slate-900 dark:text-white tracking-tight mb-4 md:mb-6 leading-none">
                    Life At <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 animate-gradient-x">
                        RecentureSoft
                    </span>
                </h1>
                <p className="text-[clamp(0.9rem,1.5vw,1.1rem)] text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed mb-6 md:mb-8">
                    Experience the passion, innovation, and global collaboration that drives our engineering teams to build the future.
                </p>
            </div>
        </section>
    );
}

// ==========================================
// SECTION 2: FEATURED EVENT / EVENT HERO
// ==========================================
function FeaturedEvent({ event, onViewGallery }) {
    if (!event) return null;

    return (
        <section className="relative w-full py-2 md:py-3 bg-slate-50 dark:bg-[#020617] px-6 lg:px-12 flex justify-center transition-colors duration-300">
            <div
                onClick={onViewGallery}
                className="relative w-full max-w-7xl h-[320px] sm:h-[400px] md:h-[600px] rounded-3xl overflow-hidden group cursor-pointer border border-slate-200 dark:border-white/10 shadow-lg hover:shadow-2xl hover:border-cyan-500/20 dark:hover:border-cyan-400/20 hover:-translate-y-2 transition-all duration-500"
            >
                {/* Background Image */}
                <div className="absolute inset-0 transition-transform duration-1000 group-hover:scale-[1.03]">
                    <Image 
                        src={event.heroImage} 
                        alt={event.title} 
                        fill 
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px" 
                        className="object-cover" 
                        priority
                    />
                    {/* Dark Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/95 via-[#020617]/40 to-transparent" />
                </div>

                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 p-6 md:p-8 lg:p-10 w-full flex flex-col md:flex-row justify-between items-start md:items-end gap-6 md:gap-8 z-10">
                    <div className="flex flex-col gap-3 text-left">
                        <h2 className="text-[clamp(1.8rem,4vw,3.2rem)] font-extrabold text-white leading-tight tracking-tight drop-shadow-md">
                            {event.title}
                        </h2>
                        
                        {/* Event Location, Date & Photo Count badges */}
                        <div className="flex flex-wrap items-center gap-3 text-slate-200 text-xs md:text-sm font-semibold select-none">
                            {event.date && (
                                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/10">
                                    📅 {event.date}
                                </span>
                            )}
                            {event.location && (
                                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/10">
                                    📍 {event.location}
                                </span>
                            )}
                            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cyan-500/20 backdrop-blur-sm border border-cyan-400/20 text-cyan-400">
                                📸 {event.photoCount || 0} Photos
                            </span>
                        </div>
                    </div>

                    <button 
                        onClick={(e) => {
                            e.stopPropagation();
                            onViewGallery();
                        }}
                        className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-xl text-white font-bold transition-all group-hover:bg-cyan-500 group-hover:border-cyan-400 group-hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] cursor-pointer self-start md:self-end flex-shrink-0"
                    >
                        View Gallery
                    </button>
                </div>
            </div>
        </section>
    );
}

// ==========================================
// SECTION 3: EVENT BENTO GALLERY
// ==========================================
function BentoCard({ src, colSpan, rowSpan, title, date, photoCount, onClick }) {
    return (
        <div
            onClick={onClick}
            className={`relative rounded-3xl overflow-hidden group cursor-pointer border border-slate-200 dark:border-white/5 bg-white dark:bg-white/5 shadow-md hover:shadow-2xl hover:border-cyan-500/20 dark:hover:border-cyan-400/20 ${colSpan} ${rowSpan} hover:-translate-y-2.5 hover:z-10 transition-all duration-300`}
        >
            <div className="absolute inset-0 transition-transform duration-1000 group-hover:scale-[1.03]">
                <Image src={src} alt={title} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/30 to-transparent opacity-85 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            {/* Animated Gradient Border Glow */}
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-cyan-500/30 rounded-3xl transition-colors duration-500" />

            <div className="absolute bottom-0 left-0 p-5 md:p-6 lg:p-8 translate-y-2 group-hover:translate-y-0 transition-transform duration-500 text-left">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-2 tracking-tight drop-shadow-md">{title}</h3>
                
                <div className="flex flex-wrap items-center gap-2 select-none">
                    <span className="text-cyan-400 font-bold text-xs uppercase tracking-wider">{date}</span>
                    <span className="w-1 h-1 rounded-full bg-cyan-400" />
                    <span className="text-slate-300 font-semibold text-xs flex items-center gap-1">
                        📸 {photoCount || 0} Photos
                    </span>
                </div>
            </div>
        </div>
    );
}

function EventBentoGallery({ events, onSelectEvent }) {
    if (!events || events.length === 0) return null;

    const bentoLayouts = [
        { colSpan: "md:col-span-2 lg:col-span-2", rowSpan: "md:row-span-1 lg:row-span-2" },
        { colSpan: "md:col-span-1 lg:col-span-2", rowSpan: "row-span-1" },
        { colSpan: "md:col-span-1 lg:col-span-1", rowSpan: "row-span-1" },
        { colSpan: "md:col-span-2 lg:col-span-1", rowSpan: "row-span-1" },
        { colSpan: "md:col-span-3 lg:col-span-4", rowSpan: "row-span-1" }
    ];

    return (
        <section className="relative w-full py-2 md:py-3 bg-slate-50 dark:bg-[#020617] px-6 lg:px-12 transition-colors duration-300">
            <div className="max-w-7xl mx-auto flex flex-col gap-2 md:gap-4">
                <div className="flex flex-col gap-3 text-center items-center">
                    <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-bold text-slate-900 dark:text-white">
                        Moments <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600 dark:from-cyan-400 dark:to-blue-500">Captured</span>
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400 max-w-2xl text-[clamp(0.9rem,1.5vw,1.1rem)]">
                        A glimpse into our collaborative workspaces, team celebrations, and global initiatives.
                    </p>
                </div>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 auto-rows-[220px] md:auto-rows-[260px] lg:auto-rows-[300px] gap-4 md:gap-5 lg:gap-6">
                    {events.map((event, index) => {
                        const layout = bentoLayouts[index % bentoLayouts.length];
                        return (
                            <BentoCard
                                key={event._id}
                                src={event.heroImage}
                                colSpan={layout.colSpan}
                                rowSpan={layout.rowSpan}
                                title={event.title}
                                date={event.date}
                                photoCount={event.photoCount}
                                onClick={() => onSelectEvent(event)}
                            />
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

// ==========================================
// SECTION 4: EVENT TIMELINE
// ==========================================
const TIMELINE_EVENTS = [
    { year: "2026", title: "Global Team Retreat", desc: "Our teams from 5 countries gathered for a massive synergy event.", icon: Globe, color: "from-blue-500 to-cyan-400", shadow: "shadow-blue-500/20" },
    { year: "2025", title: "Series B Celebration", desc: "Celebrating our massive growth phase with the entire engineering crew.", icon: Award, color: "from-purple-500 to-pink-500", shadow: "shadow-purple-500/20" },
    { year: "2024", title: "Women's Day Summit", desc: "Empowering our female leaders across the technology landscape.", icon: Users, color: "from-orange-500 to-red-500", shadow: "shadow-orange-500/20" },
    { year: "2023", title: "First Office Inauguration", desc: "The foundation of RecentureSoft's core engineering hub.", icon: Building, color: "from-emerald-500 to-teal-400", shadow: "shadow-emerald-500/20" },
];

function EventTimeline() {
    return (
        <section className="relative w-full py-2 md:py-3 bg-slate-50 dark:bg-[#020617] px-6 lg:px-12 transition-colors duration-300 overflow-hidden">
            {/* Background Decor to fix "empty" feeling */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-7xl mx-auto flex flex-col gap-5 md:gap-6 relative z-10">
                <div className="text-center max-w-2xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-1.5 tracking-tight">
                        Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-500">Journey</span>
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base">
                        From our humble beginnings to a global engineering force. Here are the key milestones that define who we are today.
                    </p>
                </div>

                <div className="max-w-4xl mx-auto relative w-full mt-4">
                    {/* Static Gradient Center Line */}
                    <div className="absolute left-[28px] md:left-1/2 top-2 bottom-2 w-1.5 bg-gradient-to-b from-blue-500 via-purple-500 to-emerald-500 rounded-full transform md:-translate-x-1/2 opacity-20 dark:opacity-30" />

                    <div className="flex flex-col gap-4 md:gap-6">
                        {TIMELINE_EVENTS.map((item, idx) => {
                            const isEven = idx % 2 === 0;
                            const Icon = item.icon;
                            return (
                                <div key={idx} className={`relative flex flex-col md:flex-row items-start md:items-center ${isEven ? 'md:flex-row-reverse' : ''} pl-14 md:pl-0 group`}>
                                    
                                    {/* Timeline Node/Dot */}
                                    <div className={`absolute left-[28px] md:left-1/2 w-10 h-10 rounded-full bg-white dark:bg-slate-900 border-4 border-slate-50 dark:border-[#020617] shadow-md transform -translate-x-1/2 -mt-1 md:mt-0 z-10 flex items-center justify-center transition-transform duration-500 group-hover:scale-110`}>
                                        <div className={`w-full h-full rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center`}>
                                            <Icon className="w-4 h-4 text-white drop-shadow-sm" />
                                        </div>
                                    </div>

                                    {/* Content Card */}
                                    <div
                                        className={`w-full md:w-[45%] flex flex-col gap-2.5 p-5 md:p-6 rounded-3xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 backdrop-blur-xl shadow-md hover:shadow-lg hover:${item.shadow} transition-all duration-500 hover:-translate-y-1 group-hover:border-slate-300 dark:group-hover:border-white/20 ${isEven ? 'md:text-left' : 'md:text-right'}`}
                                    >
                                        <div className={`inline-flex w-fit px-4 py-1.5 rounded-full bg-gradient-to-r ${item.color} text-white font-bold tracking-widest text-xs shadow-sm ${isEven ? '' : 'md:ml-auto'}`}>
                                            {item.year}
                                        </div>
                                        <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">{item.title}</h3>
                                        <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base leading-relaxed">{item.desc}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}

// ==========================================
// SECTION 5: CULTURE STATS
// ==========================================
function CultureStats() {
    const stats = [
        { num: "500+", label: "Projects Delivered" },
        { num: "120+", label: "Global Clients" },
        { num: "98%", label: "Client Satisfaction" },
        { num: "24/7", label: "Enterprise Support" }
    ];

    return (
        <section className="relative w-full py-2 md:py-3 bg-slate-50 dark:bg-[#020617] px-6 lg:px-12 overflow-hidden transition-colors duration-300">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557683311-eac922347aa1?q=80&w=2000')] bg-cover bg-center opacity-5 mix-blend-screen dark:mix-blend-screen" />
            <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {stats.map((stat, i) => (
                    <div
                        key={i}
                        className="flex flex-col items-center justify-center p-4 md:p-6 lg:p-8 rounded-3xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 backdrop-blur-xl hover:bg-slate-50 dark:hover:bg-white/10 hover:border-cyan-500/30 transition-all duration-300 group shadow-sm dark:shadow-none"
                    >
                        <span className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">{stat.num}</span>
                        <span className="text-sm md:text-base text-slate-600 dark:text-slate-400 font-medium tracking-wide text-center">{stat.label}</span>
                    </div>
                ))}
            </div>
        </section>
    );
}

// ==========================================
// SECTION 6: VIDEO REEL PREVIEW
// ==========================================
function VideoReelPreview() {
    return (
        <section className="relative w-full py-2 md:py-3 bg-slate-50 dark:bg-[#020617] px-6 lg:px-12 flex justify-center transition-colors duration-300">
            <div
                className="relative w-full max-w-6xl h-[50vh] md:h-[70vh] rounded-3xl overflow-hidden group cursor-pointer border border-slate-200 dark:border-white/10 shadow-sm dark:shadow-none"
            >
                <Image src={IMAGES.videoThumb} alt="Culture Reel" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px" className="object-cover transition-transform duration-1000 group-hover:scale-105" />
                <div className="absolute inset-0 bg-slate-950/40 group-hover:bg-slate-950/20 transition-colors duration-500" />

                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-24 h-24 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:scale-110 group-hover:bg-cyan-500/20 group-hover:border-cyan-400 transition-all duration-500">
                        <div className="absolute inset-0 rounded-full animate-ping bg-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <svg className="w-10 h-10 text-white ml-2" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                        </svg>
                    </div>
                </div>
            </div>
        </section>
    );
}

// ==========================================
// SECTION 7: INFINITE MARQUEE
// ==========================================
function InfiniteEventMarquee() {
    return (
        <section className="relative w-full py-2 md:py-3 bg-slate-50 dark:bg-[#020617] overflow-hidden transition-colors duration-300">
            <div className="flex gap-6 animate-marquee hover:[animation-play-state:paused] w-[200%]">
                {[...IMAGES.marquee, ...IMAGES.marquee].map((src, i) => (
                    <div key={i} className="relative w-[300px] md:w-[400px] h-[250px] rounded-2xl overflow-hidden flex-shrink-0 border border-white/10">
                        <Image src={src} alt="Event" fill sizes="400px" className="object-cover" />
                    </div>
                ))}
            </div>

            <style dangerouslySetInnerHTML={{__html: `
                .animate-marquee {
                    animation: marquee 30s linear infinite;
                }
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
            `}} />
        </section>
    );
}

// ==========================================
// SECTION 8: TESTIMONIALS
// ==========================================
function EmployeeTestimonials() {
    return (
        <section className="relative w-full py-2 md:py-3 bg-slate-50 dark:bg-[#020617] px-6 lg:px-12 transition-colors duration-300">
            <div className="max-w-7xl mx-auto flex flex-col gap-2 md:gap-4">
                <div className="text-center">
                    <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-bold text-slate-900 dark:text-white mb-3 md:mb-4">
                        Hear From Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-600 dark:from-purple-400 dark:to-cyan-500">Team</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    {[1, 2, 3].map((item, i) => (
                        <div
                            key={i}
                            className="p-4 md:p-6 lg:p-8 rounded-3xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 backdrop-blur-sm hover:-translate-y-2 hover:border-cyan-500/30 transition-all duration-300 shadow-sm dark:shadow-none"
                        >
                            <div className="text-cyan-500 dark:text-cyan-400 mb-6 text-4xl text-left">&ldquo;</div>
                            <p className="text-slate-600 dark:text-slate-300 text-lg mb-8 line-clamp-4 text-left">
                                &ldquo;Joining RecentureSoft was the best career move. The events, the global culture, and the absolute focus on engineering excellence makes every day exciting.&rdquo;
                            </p>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full overflow-hidden relative">
                                    <Image src={IMAGES.testimonials[i % IMAGES.testimonials.length]} alt="Employee" fill sizes="48px" className="object-cover" />
                                </div>
                                <div className="text-left">
                                    <h4 className="text-slate-900 dark:text-white font-bold">Sarah Jenkins</h4>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">Senior Cloud Architect</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// ==========================================
// SECTION 9: CTA
// ==========================================
function EventsCTA() {
    return (
        <section className="relative w-full py-2 md:py-3 bg-slate-50 dark:bg-[#020617] px-6 lg:px-12 overflow-hidden flex justify-center transition-colors duration-300">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-cyan-50 dark:to-cyan-950/20 pointer-events-none" />
            <div
                className="relative z-10 max-w-4xl w-full p-5 md:p-10 lg:p-16 rounded-[3rem] bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 backdrop-blur-xl text-center flex flex-col items-center gap-6 md:gap-8 shadow-sm dark:shadow-none"
            >
                <h2 className="text-[clamp(1.8rem,4.5vw,3.5rem)] font-bold text-slate-900 dark:text-white tracking-tight leading-tight">
                    Want To Build The <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-500">Future</span> With Us?
                </h2>
                <p className="text-[clamp(0.9rem,1.5vw,1.1rem)] text-slate-600 dark:text-slate-400 max-w-xl">
                    Whether you&apos;re looking to join our engineering teams or partner with us for your next digital transformation, we&apos;re ready.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4 mt-4">
                    <button 
                        onClick={() => window.location.href = '/contact'}
                        className="px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:-translate-y-1"
                    >
                        Join Our Team
                    </button>
                </div>
            </div>
        </section>
    );
}

// ==========================================
// MAIN EXPORT ASSEMBLY
// ==========================================
export default function CinematicEvents({ events = [] }) {
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenGallery = (event) => {
        setSelectedEvent(event);
        setIsModalOpen(true);
    };

    if (events.length === 0) {
        return (
            <div className="w-full flex flex-col bg-slate-50 dark:bg-[#020617] transition-colors duration-300">
                <EventsHero />
                <div className="w-full flex flex-col items-center justify-center py-20 px-6 bg-slate-50 dark:bg-[#020617] text-center min-h-[40vh]">
                    <div className="p-8 rounded-[2rem] bg-white/80 dark:bg-[#080d19]/80 border border-slate-200 dark:border-white/10 max-w-md shadow-premium backdrop-blur-md">
                        <span className="text-5xl mb-4 block">🎉</span>
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">No Events Found</h2>
                        <p className="text-slate-600 dark:text-slate-400 mb-6">
                            We are currently planning our next big events. Stay tuned to capture new memories!
                        </p>
                    </div>
                </div>
                <EventTimeline />
                <CultureStats />
                <VideoReelPreview />
                <InfiniteEventMarquee />
                <EmployeeTestimonials />
                <EventsCTA />
            </div>
        );
    }

    const featuredEvent = events.find(e => e.featured) || events[0];
    const otherEvents = events.filter(e => e._id !== featuredEvent?._id);

    return (
        <div className="w-full flex flex-col bg-slate-50 dark:bg-[#020617] transition-colors duration-300">
            <EventsHero />
            
            {featuredEvent && (
                <FeaturedEvent 
                    event={featuredEvent} 
                    onViewGallery={() => handleOpenGallery(featuredEvent)} 
                />
            )}
            
            {otherEvents.length > 0 && (
                <EventBentoGallery 
                    events={otherEvents} 
                    onSelectEvent={handleOpenGallery} 
                />
            )}
            
            <EventTimeline />
            <CultureStats />
            <VideoReelPreview />
            <InfiniteEventMarquee />
            <EmployeeTestimonials />
            <EventsCTA />

            <EventGalleryModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                event={selectedEvent} 
            />
        </div>
    );
}
