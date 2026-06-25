import { useEffect, useRef } from "react";
import Image from "next/image";

// ── Testimonials Data ──
const TESTIMONIALS = [
    {
        id: "franklin",
        name: "Franklin Brice",
        role: "Director",
        company: "Alpha Digital",
        rating: 5,
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        text: "Revamping my company's official website using Recenturesoft's SEO services did wonders for my website's online search engine ranking! It was a great experience working with a team of such flexible and responsive employees."
    },
    {
        id: "philip",
        name: "Philip Dixon",
        role: "Creative Director",
        company: "Vivid Studio",
        rating: 5,
        avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&h=150&fit=crop&crop=face",
        text: "Recenturesoft has completely changed the appearance of my website in terms of the design and customisation options. They have given me something that I can be proud of."
    },
    {
        id: "timothy",
        name: "Timothy Rios",
        role: "Marketing Manager",
        company: "Nova Solutions",
        rating: 5,
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
        text: "My company's online search engine ranking improved marginally using Recenturesoft's SEO services. They did not take it as just another URL and worked on it with complete dedication. It was a great experience working with the team!"
    },
    {
        id: "sophia",
        name: "Sophia Alvarez",
        role: "Product Lead",
        company: "CloudSync",
        rating: 5,
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
        text: "The team delivered our SaaS dashboard two weeks ahead of schedule. The animations are fluid, the WebGL maps are extremely responsive, and the code architecture is clean. 10/10."
    },
    {
        id: "marcus",
        name: "Marcus Chen",
        role: "CTO",
        company: "NeuralFlow AI",
        rating: 5,
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
        text: "Recenturesoft restructured our legacy API pipeline into a lightning-fast serverless structure. Core latency dropped under 80ms globally. Their engineering capabilities are exceptional."
    },
    {
        id: "emily",
        name: "Emily Watson",
        role: "VP of Operations",
        company: "Zenith Retail",
        rating: 5,
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
        text: "From UI/UX redesign to automated deployments, their full-stack Laravel/React team exceeded our expectations. Our checkout conversion rates increased by 40% immediately."
    }
];

// Duplicate items for seamless continuous marquee looping
const DUPLICATED_TESTIMONIALS = [...TESTIMONIALS, ...TESTIMONIALS];

function ReviewCard({ review, index }) {
    return (
        <div
            className="testimonial-float-card flex-shrink-0"
            style={{ animationDelay: `${index * 0.4}s` }}
        >
            <div
                className="group w-[85vw] sm:w-[400px] md:w-[440px] h-[300px] md:h-[340px] relative bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950/50 dark:to-slate-950/20 backdrop-blur-xl border border-slate-200 dark:border-white/[0.08] rounded-[28px] p-5 md:p-6 lg:p-8 flex flex-col justify-between cursor-pointer transition-all duration-500 overflow-hidden select-none hover:border-cyan-500/30 dark:hover:border-cyan-500/30 hover:shadow-premium dark:hover:shadow-[0_0_50px_rgba(6,182,212,0.15)] hover:-translate-y-3 hover:scale-[1.03] opacity-100"
            >
                {/* Glowing border outline on hover */}
                <div
                    className="absolute -inset-px rounded-[28px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10 border border-cyan-500/35"
                />

                {/* Soft Cyan Glow Spot on Hover */}
                <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-0"
                    style={{
                        background: "radial-gradient(200px circle at 50% 50%, rgba(6, 182, 212, 0.08), transparent 60%)"
                    }}
                />

                {/* Quote and Stars */}
                <div className="relative z-10">
                    <div className="flex justify-between items-start mb-6">
                        {/* Stars */}
                        <div className="flex gap-1">
                            {Array.from({ length: review.rating }).map((_, i) => (
                                <svg key={i} className="w-4.5 h-4.5 text-cyan-400 fill-current drop-shadow-[0_0_8px_rgba(34,211,238,0.4)]" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                             ))}
                        </div>
                        {/* Quote Icon */}
                        <svg className="w-8 h-8 text-cyan-500/20 group-hover:text-cyan-400/50 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M3 21c3 0 7-9 7-14h-5v-3h7v6c0 6-3 11-9 11zm11 0c3 0 7-9 7-14h-5v-3h7v6c0 6-3 11-9 11z" />
                        </svg>
                    </div>

                    <p className="text-slate-700 dark:text-gray-200 text-sm md:text-base font-normal leading-relaxed mb-8 select-text line-clamp-4">
                        &quot;{review.text}&quot;
                    </p>
                </div>

                {/* Author info */}
                <div className="relative z-10 flex items-center gap-4 mt-auto">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-slate-200 dark:border-white/10 group-hover:border-cyan-500/70 dark:group-hover:border-cyan-400/70 transition-colors duration-500 shadow-sm dark:shadow-[0_0_15px_rgba(6,182,212,0.15)] group-hover:shadow-md dark:group-hover:shadow-[0_0_20px_rgba(6,182,212,0.3)]">
                        <Image
                            src={review.avatar}
                            alt={review.name}
                            width={48}
                            height={48}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            loading="lazy"
                        />
                    </div>
                    <div>
                        <h4 className="text-slate-800 dark:text-gray-200 text-sm font-bold group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors duration-300">
                            {review.name}
                        </h4>
                        <p className="text-slate-500 dark:text-gray-500 text-xs mt-0.5">
                            {review.role} <span className="text-cyan-600 dark:text-cyan-400 font-semibold ml-1">@{review.company}</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function Review() {
    const containerRef = useRef(null);
    const trackRef = useRef(null);
    const isDownRef = useRef(false);
    const startXRef = useRef(0);
    const scrollLeftRef = useRef(0);
    const requestRef = useRef(null);
    const isPausedRef = useRef(false);

    useEffect(() => {
        const container = containerRef.current;
        const track = trackRef.current;
        if (!container || !track) return;

        // Auto-scroll loop using requestAnimationFrame for smooth movement
        const animate = () => {
            if (!isDownRef.current && !isPausedRef.current) {
                container.scrollLeft += 0.8; // scroll speed

                const halfWidth = track.scrollWidth / 2;
                if (container.scrollLeft >= halfWidth) {
                    container.scrollLeft -= halfWidth;
                }
            }
            requestRef.current = requestAnimationFrame(animate);
        };

        requestRef.current = requestAnimationFrame(animate);

        return () => {
            if (requestRef.current) {
                cancelAnimationFrame(requestRef.current);
            }
        };
    }, []);

    // Drag handlers (Mouse)
    const handleMouseDown = (e) => {
        const container = containerRef.current;
        if (!container) return;
        isDownRef.current = true;
        container.classList.add("active");
        startXRef.current = e.pageX - container.offsetLeft;
        scrollLeftRef.current = container.scrollLeft;
    };

    const handleMouseLeaveContainer = () => {
        isDownRef.current = false;
        isPausedRef.current = false;
        const container = containerRef.current;
        if (container) container.classList.remove("active");
    };

    const handleMouseUp = () => {
        isDownRef.current = false;
        const container = containerRef.current;
        if (container) container.classList.remove("active");
    };

    const handleMouseMove = (e) => {
        if (!isDownRef.current) return;
        e.preventDefault();
        const container = containerRef.current;
        const track = trackRef.current;
        if (!container || !track) return;

        const x = e.pageX - container.offsetLeft;
        const walk = (x - startXRef.current) * 1.5; // Drag speed multiplier
        let targetScroll = scrollLeftRef.current - walk;

        const halfWidth = track.scrollWidth / 2;
        if (targetScroll >= halfWidth) {
            targetScroll -= halfWidth;
            scrollLeftRef.current -= halfWidth;
            startXRef.current = x;
        } else if (targetScroll <= 0) {
            targetScroll += halfWidth;
            scrollLeftRef.current += halfWidth;
            startXRef.current = x;
        }

        container.scrollLeft = targetScroll;
    };

    // Drag handlers (Touch for Mobile)
    const handleTouchStart = (e) => {
        const container = containerRef.current;
        if (!container) return;
        isDownRef.current = true;
        startXRef.current = e.touches[0].pageX - container.offsetLeft;
        scrollLeftRef.current = container.scrollLeft;
    };

    const handleTouchEnd = () => {
        isDownRef.current = false;
    };

    const handleTouchMove = (e) => {
        if (!isDownRef.current) return;
        const container = containerRef.current;
        const track = trackRef.current;
        if (!container || !track) return;

        const x = e.touches[0].pageX - container.offsetLeft;
        const walk = (x - startXRef.current) * 1.5;
        let targetScroll = scrollLeftRef.current - walk;

        const halfWidth = track.scrollWidth / 2;
        if (targetScroll >= halfWidth) {
            targetScroll -= halfWidth;
            scrollLeftRef.current -= halfWidth;
            startXRef.current = x;
        } else if (targetScroll <= 0) {
            targetScroll += halfWidth;
            scrollLeftRef.current += halfWidth;
            startXRef.current = x;
        }

        container.scrollLeft = targetScroll;
    };

    return (
        <section className="relative pt-[clamp(0.5rem,2vw,1rem)] pb-0 bg-background transition-colors duration-300 overflow-hidden select-none">
            {/* Inject organic card floating & grab cursor styling */}
            <style dangerouslySetInnerHTML={{__html: `
                @keyframes testimonial-float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-7px); }
                }
                .testimonial-float-card {
                    animation: testimonial-float 6s ease-in-out infinite;
                    will-change: transform;
                }
                .reviews-marquee-track {
                    display: flex;
                    gap: 1.5rem;
                    width: max-content;
                    will-change: transform;
                }
                .reviews-marquee-container {
                    cursor: grab;
                }
                .reviews-marquee-container.active {
                    cursor: grabbing;
                }
            `}} />

            {/* Glowing Accent Spotlights */}
            <div className="absolute top-1/3 left-1/4 w-[300px] md:w-[400px] h-[300px] md:h-[400px] bg-cyan-100/50 dark:bg-cyan-950/15 blur-[100px] md:blur-[130px] rounded-full pointer-events-none transition-colors duration-300" />
            <div className="absolute bottom-1/3 right-1/4 w-[300px] md:w-[400px] h-[300px] md:h-[400px] bg-purple-100/50 dark:bg-purple-950/15 blur-[100px] md:blur-[130px] rounded-full pointer-events-none transition-colors duration-300" />

            <div className="max-w-7xl mx-auto px-5 sm:px-6 relative z-10">
                {/* Header */}
                <div className="text-center mb-2 md:mb-4">
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-foreground mt-2 tracking-tight leading-[1.15]">
                        What Our Clients Say
                        <span className="block bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-500 dark:from-cyan-400 dark:via-indigo-400 dark:to-purple-400 bg-clip-text text-transparent mt-1.5">
                            About RecentureSoft
                        </span>
                    </h2>
                    <p className="text-slate-600 dark:text-gray-400 mt-3 max-w-2xl mx-auto text-sm md:text-base lg:text-lg leading-relaxed font-light">
                        We partner with industry-leading brands and fast-growing startups to craft next-generation engineering architectures.
                    </p>
                </div>
            </div>

            {/* Testimonials Carousel Container */}
            <div
                ref={containerRef}
                className="reviews-marquee-container relative w-full overflow-hidden py-10 select-none"
                onMouseDown={handleMouseDown}
                onMouseLeave={handleMouseLeaveContainer}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                onTouchMove={handleTouchMove}
                onMouseEnter={() => { isPausedRef.current = true; }}
            >
                {/* Side gradient blur masks removed as per user request */}

                <div ref={trackRef} className="reviews-marquee-track">
                    {DUPLICATED_TESTIMONIALS.map((review, idx) => (
                        <ReviewCard
                            key={`${review.id}-${idx}`}
                            review={review}
                            index={idx}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
