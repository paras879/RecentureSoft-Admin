"use client";
import { useProjectModal } from "@/components/providers/ProjectModalProvider";
import { useMeetingModal } from "@/components/providers/MeetingModalProvider";

const STATS = [
    { value: "500+", label: "Projects Delivered" },
    { value: "120+", label: "Global Clients" },
    { value: "15+", label: "Countries Served" },
    { value: "98%", label: "Client Satisfaction" },
    { value: "24/7", label: "Enterprise Support" },
];

const TRUST_INDICATORS = [
    "500+ Projects Delivered",
    "120+ Global Clients",
    "15+ Countries Served",
    "98% Client Satisfaction"
];

// City dot positions as percentage coordinates within the globe SVG (cx/cy on a 200x200 viewBox)
const CITY_DOTS = [
    { cx: 46, cy: 72, color: "#00E5FF", delay: 0 },      // USA
    { cx: 50, cy: 60, color: "#3B82F6", delay: 0.4 },     // Canada
    { cx: 95, cy: 65, color: "#8B5CF6", delay: 0.8 },     // UK
    { cx: 102, cy: 62, color: "#14B8A6", delay: 1.2 },    // Germany
    { cx: 128, cy: 76, color: "#00E5FF", delay: 1.6 },    // UAE
    { cx: 142, cy: 78, color: "#3B82F6", delay: 2.0 },    // India
    { cx: 162, cy: 84, color: "#8B5CF6", delay: 2.4 },    // Singapore
    { cx: 165, cy: 105, color: "#14B8A6", delay: 2.8 },   // Australia
    { cx: 172, cy: 70, color: "#00E5FF", delay: 3.2 },    // Japan
    { cx: 60, cy: 98, color: "#6366F1", delay: 3.6 },     // Brazil
    { cx: 112, cy: 108, color: "#A855F7", delay: 4.0 },   // South Africa
];

// Animated arc lines between cities (SVG path d attributes)
const ARC_LINES = [
    { d: "M 46,72 Q 70,45 95,65", color: "#00E5FF", delay: 0 },
    { d: "M 95,65 Q 112,58 128,76", color: "#3B82F6", delay: 0.5 },
    { d: "M 128,76 Q 135,72 142,78", color: "#8B5CF6", delay: 1.0 },
    { d: "M 142,78 Q 152,70 162,84", color: "#14B8A6", delay: 1.5 },
    { d: "M 162,84 Q 168,75 172,70", color: "#00E5FF", delay: 2.0 },
    { d: "M 46,72 Q 53,85 60,98", color: "#6366F1", delay: 2.5 },
    { d: "M 60,98 Q 86,100 112,108", color: "#A855F7", delay: 3.0 },
    { d: "M 46,72 Q 110,40 172,70", color: "#3B82F6", delay: 0.8 },
];

function CSSGlobe() {
    return (
        <div className="relative w-full h-full flex items-center justify-center select-none">
            {/* Ambient outer glow */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[75%] h-[75%] rounded-full bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-purple-500/10 blur-2xl" />
            </div>

            {/* Globe SVG */}
            <div className="relative w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] md:w-[420px] md:h-[420px] lg:w-[480px] lg:h-[480px]">
                <svg
                    viewBox="0 0 200 200"
                    className="w-full h-full"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    {/* Globe fill */}
                    <circle cx="100" cy="100" r="85" fill="#020617" fillOpacity="0.85" />

                    {/* Subtle continent landmasses suggestion */}
                    <circle cx="100" cy="100" r="85" fill="none" stroke="#0ea5e9" strokeWidth="0.5" strokeOpacity="0.15" />

                    {/* Latitude lines */}
                    {[20, 40, 60, 80].map((r, i) => (
                        <ellipse
                            key={`lat-${i}`}
                            cx="100" cy="100"
                            rx={r * 85 / 85}
                            ry={r}
                            fill="none"
                            stroke="#0ea5e9"
                            strokeWidth="0.4"
                            strokeOpacity="0.12"
                        />
                    ))}
                    {/* Longitude lines */}
                    {[0, 30, 60, 90, 120, 150].map((angle, i) => (
                        <line
                            key={`lon-${i}`}
                            x1="100" y1="15"
                            x2="100" y2="185"
                            stroke="#0ea5e9"
                            strokeWidth="0.4"
                            strokeOpacity="0.12"
                            transform={`rotate(${angle} 100 100)`}
                        />
                    ))}

                    {/* Wireframe overlay */}
                    <circle cx="100" cy="100" r="85" fill="none" stroke="#38bdf8" strokeWidth="0.6" strokeOpacity="0.2" strokeDasharray="3 6" />

                    {/* Arc connection lines */}
                    {ARC_LINES.map((arc, i) => (
                        <path
                            key={`arc-${i}`}
                            d={arc.d}
                            fill="none"
                            stroke={arc.color}
                            strokeWidth="0.6"
                            strokeOpacity="0.45"
                            strokeDasharray="2 3"
                        />
                    ))}

                    {/* City pulse dots */}
                    {CITY_DOTS.map((dot, i) => (
                        <g key={`dot-${i}`}>
                            <circle cx={dot.cx} cy={dot.cy} r="2" fill={dot.color} opacity="0.9" />
                            <circle cx={dot.cx} cy={dot.cy} r="4" fill={dot.color} opacity="0.2">
                                <animate
                                    attributeName="r"
                                    values="2;6;2"
                                    dur="3s"
                                    begin={`${dot.delay}s`}
                                    repeatCount="indefinite"
                                />
                                <animate
                                    attributeName="opacity"
                                    values="0.4;0;0.4"
                                    dur="3s"
                                    begin={`${dot.delay}s`}
                                    repeatCount="indefinite"
                                />
                            </circle>
                        </g>
                    ))}

                    {/* Globe atmosphere rim */}
                    <circle
                        cx="100" cy="100" r="85"
                        fill="none"
                        stroke="url(#rimGradient)"
                        strokeWidth="3"
                        strokeOpacity="0.5"
                    />

                    <defs>
                        <radialGradient id="rimGradient" cx="40%" cy="40%">
                            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.8" />
                            <stop offset="100%" stopColor="#6366f1" stopOpacity="0.2" />
                        </radialGradient>
                    </defs>
                </svg>

                {/* CSS rotating orbital ring 1 */}
                <div
                    className="absolute inset-0 rounded-full border border-cyan-500/20"
                    style={{
                        animation: "orbitSpin1 18s linear infinite",
                        transform: "rotateX(70deg) rotateZ(0deg)",
                    }}
                />
                {/* CSS rotating orbital ring 2 */}
                <div
                    className="absolute inset-[8%] rounded-full border border-purple-500/15"
                    style={{
                        animation: "orbitSpin2 24s linear infinite reverse",
                        transform: "rotateX(55deg) rotateZ(30deg)",
                    }}
                />

                {/* Floating satellite dot on ring 1 */}
                <div
                    className="absolute w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]"
                    style={{
                        top: "50%",
                        left: "50%",
                        animation: "orbit1 8s linear infinite"
                    }}
                />
                {/* Floating satellite dot on ring 2 */}
                <div
                    className="absolute w-1.5 h-1.5 rounded-full bg-purple-400 shadow-[0_0_6px_rgba(168,85,247,0.8)]"
                    style={{
                        top: "50%",
                        left: "50%",
                        animation: "orbit2 12s linear infinite"
                    }}
                />
            </div>

            <style dangerouslySetInnerHTML={{__html: `
                @keyframes orbitSpin1 {
                    from { transform: rotateX(70deg) rotateZ(0deg); }
                    to   { transform: rotateX(70deg) rotateZ(360deg); }
                }
                @keyframes orbitSpin2 {
                    from { transform: rotateX(55deg) rotateZ(30deg); }
                    to   { transform: rotateX(55deg) rotateZ(390deg); }
                }
                @keyframes orbit1 {
                    0% { transform: translate(-50%, -50%) translate(85px, 0); }
                    25% { transform: translate(-50%, -50%) translate(0, 30px); }
                    50% { transform: translate(-50%, -50%) translate(-85px, 0); }
                    75% { transform: translate(-50%, -50%) translate(0, -30px); }
                    100% { transform: translate(-50%, -50%) translate(85px, 0); }
                }
                @keyframes orbit2 {
                    0% { transform: translate(-50%, -50%) translate(-70px, 0); }
                    25% { transform: translate(-50%, -50%) translate(0, -25px); }
                    50% { transform: translate(-50%, -50%) translate(70px, 0); }
                    75% { transform: translate(-50%, -50%) translate(0, 25px); }
                    100% { transform: translate(-50%, -50%) translate(-70px, 0); }
                }
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(15px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                @keyframes fadeInUpLarge {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                @keyframes scaleIn {
                    from {
                        opacity: 0;
                        transform: scale(0.92);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1);
                    }
                }
                .animate-fade-in-up {
                    animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                    opacity: 0;
                }
                .animate-fade-in-up-large {
                    animation: fadeInUpLarge 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                    opacity: 0;
                }
                .animate-scale-in {
                    animation: scaleIn 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                    opacity: 0;
                }
            `}} />
        </div>
    );
}

export default function ContactHero() {
    const { openModal } = useProjectModal();
    const { openMeetingModal } = useMeetingModal();
    return (
        <section className="relative w-full pt-20 md:pt-24 lg:pt-28 pb-10 md:pb-14 lg:pb-20">
            {/* Ambient Bounded Background Glows */}
            <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-cyan-900/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-12 relative z-10 flex flex-col gap-[clamp(2rem,4vw,4rem)] lg:gap-[clamp(2rem,4vw,4rem)]">

                {/* --- 45/55 SPLIT LAYOUT --- */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-8 lg:gap-8 items-center">

                    {/* LEFT CONTENT (45%) */}
                    <div className="lg:col-span-5 flex flex-col items-start gap-6 z-20 order-2 lg:order-1">
                        <h1
                            className="text-[clamp(2rem,8vw,4rem)] lg:text-[3.25rem] font-bold text-slate-900 dark:text-white leading-[1.1] tracking-tight animate-fade-in-up"
                            style={{ animationDelay: "100ms" }}
                        >
                            Delivering Enterprise Technology <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500 dark:from-cyan-400 dark:to-blue-500">Worldwide</span>
                        </h1>

                        <p
                            className="text-[clamp(1rem,1.5vw,1.25rem)] text-slate-600 dark:text-slate-400 max-w-lg leading-relaxed animate-fade-in-up"
                            style={{ animationDelay: "200ms" }}
                        >
                            RecentureSoft helps businesses build AI products, enterprise software, cloud infrastructure, and digital experiences across multiple countries and industries.
                        </p>

                        <div
                            className="flex flex-col sm:flex-row w-full gap-3 pt-2 animate-fade-in-up"
                            style={{ animationDelay: "300ms" }}
                        >
                            <button 
                                onClick={openModal}
                                className="px-7 py-3.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold rounded-lg transition-colors"
                            >
                                Start a Project
                            </button>
                            <button 
                                onClick={openMeetingModal}
                                className="px-7 py-3.5 bg-slate-200/50 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 border border-slate-300 dark:border-white/10 text-slate-800 dark:text-white font-semibold rounded-lg transition-colors backdrop-blur-sm"
                            >
                                Schedule Consultation
                            </button>
                        </div>

                        {/* Trust Indicators */}
                        <div
                            className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 pt-2 w-full max-w-lg border-t border-slate-200 dark:border-white/10 mt-2 animate-fade-in-up"
                            style={{ animationDelay: "400ms" }}
                        >
                            {TRUST_INDICATORS.map((indicator, i) => (
                                <div key={i} className="flex items-center gap-2">
                                    <div className="w-4 h-4 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                                        <svg className="w-2.5 h-2.5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <span className="text-xs md:text-sm font-medium text-slate-600 dark:text-slate-300">{indicator}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT: CSS ANIMATED GLOBE (55%) */}
                    <div
                        className="lg:col-span-7 w-full flex items-center justify-center order-1 lg:order-2 animate-scale-in"
                        style={{ animationDelay: "200ms" }}
                    >
                        <div className="w-full max-w-[280px] sm:max-w-[360px] md:max-w-[460px] lg:max-w-[520px] mx-auto h-[280px] sm:h-[360px] md:h-[420px] lg:h-[500px] flex items-center justify-center">
                            <CSSGlobe />
                        </div>
                    </div>
                </div>

                {/* --- ENTERPRISE STATS ROW --- */}
                <div
                    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 lg:gap-5 pt-2 animate-fade-in-up-large"
                    style={{ animationDelay: "500ms" }}
                >
                    {STATS.map((stat, i) => (
                        <div
                            key={i}
                            className={`flex flex-col items-start p-2.5 md:p-5 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 backdrop-blur-md hover:bg-slate-100 dark:hover:bg-white/[0.05] transition-colors ${i === 4 ? "col-span-2 md:col-span-1" : ""}`}
                        >
                            <span className="text-lg md:text-3xl font-bold text-slate-900 dark:text-white mb-1">{stat.value}</span>
                            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium tracking-wide uppercase">{stat.label}</span>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
