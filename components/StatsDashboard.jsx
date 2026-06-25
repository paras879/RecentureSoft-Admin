"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { motion } from "framer-motion";
import Counter3D from "@/components/Counter3D";
import BackgroundEffect from "@/components/BackgroundEffect";
import KPIWidget from "@/components/KPIWidget";
import LiveStatusBar from "@/components/LiveStatusBar";

/* ═══════════════════════════════════════════════════════
   COLOR TOKENS (single source of truth)
   ═══════════════════════════════════════════════════════ */
const C = {
    primary: "#06E6FF",  // Electric Cyan
    secondary: "#3B82F6",  // Deep Blue
    accent: "#8B5CF6",  // Neon Violet
    navy: "#050816",  // Deep Navy
    // Derived
    primaryDim: "rgba(6,230,255,0.15)",
    primaryGlow: "rgba(6,230,255,0.25)",
    secondaryDim: "rgba(59,130,246,0.15)",
    accentDim: "rgba(139,92,246,0.12)",
    gradient: `linear-gradient(135deg, #06E6FF, #3B82F6, #8B5CF6)`,
    barGradient: `linear-gradient(180deg, #06E6FF 0%, #3B82F6 55%, #8B5CF6 100%)`,
    barGradientHover: `linear-gradient(180deg, #06E6FF 0%, #3B82F6 45%, #8B5CF6 100%)`,
};

/* ═══════════════════════════════════════════════════════
   ICONS
   ═══════════════════════════════════════════════════════ */
const icons = {
    projects: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-12 h-12 mx-auto" style={{ color: C.primary }}>
            <path d="M3 7h18M3 12h18M3 17h18" />
        </svg>
    ),
    customers: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-12 h-12 mx-auto" style={{ color: C.primary }}>
            <circle cx="12" cy="8" r="4" />
            <path d="M6 20c0-3.313 2.687-6 6-6s6 2.687 6 6" />
        </svg>
    ),
    industries: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-12 h-12 mx-auto" style={{ color: C.primary }}>
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <path d="M3 9h18M9 3v18" />
        </svg>
    ),
    mobile: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-12 h-12 mx-auto" style={{ color: C.primary }}>
            <rect x="7" y="2" width="10" height="20" rx="2" />
            <line x1="12" y1="18" x2="12" y2="18" />
        </svg>
    ),
};

/* ═══════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════ */
const counters = [
    { id: "projects", label: "Total Projects", value: 1240, suffix: "+", icon: icons.projects },
    { id: "customers", label: "Global Customers", value: 8600, suffix: "+", icon: icons.customers },
    { id: "industries", label: "Industries Served", value: 34, suffix: "+", icon: icons.industries },
    { id: "mobile", label: "Mobile Applications", value: 540, suffix: "+", icon: icons.mobile },
];

const kpis = [
    { label: "Growth Rate", value: "+24%", color: C.primary, trend: "up", icon: "📈" },
    { label: "Satisfaction", value: "98%", color: C.secondary, trend: "up", icon: "⭐" },
    { label: "Uptime", value: "99.9%", color: C.secondary, trend: "up", icon: "🛡️" },
    { label: "Response", value: "<100ms", color: C.accent, trend: "up", icon: "⚡" },
];

const histogramData = [
    { month: "Jan", value: 720, revenue: "$85K", satisfaction: 94, score: 87 },
    { month: "Feb", value: 940, revenue: "$112K", satisfaction: 95, score: 89 },
    { month: "Mar", value: 1100, revenue: "$134K", satisfaction: 96, score: 91 },
    { month: "Apr", value: 860, revenue: "$98K", satisfaction: 93, score: 86 },
    { month: "May", value: 1340, revenue: "$156K", satisfaction: 97, score: 93 },
    { month: "Jun", value: 1580, revenue: "$178K", satisfaction: 97, score: 94 },
    { month: "Jul", value: 1220, revenue: "$142K", satisfaction: 95, score: 90 },
    { month: "Aug", value: 1760, revenue: "$198K", satisfaction: 98, score: 95 },
    { month: "Sep", value: 1480, revenue: "$168K", satisfaction: 96, score: 92 },
    { month: "Oct", value: 1950, revenue: "$215K", satisfaction: 98, score: 96 },
    { month: "Nov", value: 2100, revenue: "$234K", satisfaction: 99, score: 97 },
    { month: "Dec", value: 2400, revenue: "$268K", satisfaction: 99, score: 98 },
];

/* ═══════════════════════════════════════════════════════
   HOLOGRAPHIC BACKGROUND (subtle rings + radial glow)
   ═══════════════════════════════════════════════════════ */
function HolographicCore() {
    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {/* Central radial glow — very low opacity */}
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-[0.04]"
                style={{
                    background: `radial-gradient(circle, ${C.primary} 0%, ${C.secondary} 35%, transparent 70%)`,
                }}
            />
            {/* Outer ring */}
            <div
                className="absolute top-1/2 left-1/2 w-[500px] h-[500px] rounded-full animate-holoSpin"
                style={{ borderWidth: 1, borderColor: `${C.primary}10`, borderStyle: "solid" }}
            />
            {/* Inner ring */}
            <div
                className="absolute top-1/2 left-1/2 w-[340px] h-[340px] rounded-full animate-holoSpinReverse"
                style={{ borderWidth: 1, borderColor: `${C.secondary}10`, borderStyle: "solid" }}
            />
            {/* Floating geometric shapes — low opacity */}
            {[
                { size: 10, top: "22%", left: "14%", delay: 0 },
                { size: 7, top: "72%", left: "86%", delay: 2 },
                { size: 9, top: "28%", left: "82%", delay: 4 },
                { size: 5, top: "78%", left: "18%", delay: 1 },
            ].map((s, i) => (
                <motion.div
                    key={i}
                    className="absolute rounded-sm animate-floatShape"
                    style={{
                        width: s.size,
                        height: s.size,
                        top: s.top,
                        left: s.left,
                        animationDelay: `${s.delay}s`,
                        rotate: 45,
                        background: i % 2 === 0 ? `${C.primary}12` : `${C.secondary}10`,
                    }}
                    animate={{ opacity: [0.15, 0.35, 0.15] }}
                    transition={{ repeat: Infinity, duration: 5, delay: s.delay, ease: "easeInOut" }}
                />
            ))}
        </div>
    );
}

/* ═══════════════════════════════════════════════════════
   FLOATING MINI-DASHBOARD (shown on bar hover)
   ═══════════════════════════════════════════════════════ */
function MiniDashboard({ data, isPeak, hovered }) {
    return (
        <div
            className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-4 z-50 w-52 pointer-events-none transition-all duration-200 ease-out origin-bottom ${hovered
                    ? "opacity-100 translate-y-0 scale-100 visible"
                    : "opacity-0 translate-y-2 scale-95 invisible"
                }`}
        >
            <div
                className="relative rounded-2xl bg-white/95 dark:bg-[#0a1225]/95 backdrop-blur-2xl p-4"
                style={{
                    border: `1px solid ${C.primary}18`,
                    boxShadow: `0 8px 32px ${C.primary}12`,
                }}
            >
                {/* Arrow */}
                <div
                    className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 rotate-45 bg-white/95 dark:bg-[#0a1225]/95"
                    style={{ borderRight: `1px solid ${C.primary}18`, borderBottom: `1px solid ${C.primary}18` }}
                />

                {/* Peak badge */}
                {isPeak && (
                    <div
                        className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-[10px] font-bold text-white uppercase tracking-wider whitespace-nowrap"
                        style={{ background: C.gradient }}
                    >
                        Peak Month
                    </div>
                )}

                {/* Header */}
                <h4 className="text-xs font-bold uppercase tracking-wider mb-3 text-left" style={{ color: C.primary }}>
                    {data.month} Analytics
                </h4>

                {/* Metrics */}
                <div className="space-y-2.5">
                    {[
                        { label: "Projects", val: data.value.toLocaleString(), icon: "📦" },
                        { label: "Revenue", val: data.revenue, icon: "💰" },
                        { label: "Satisfaction", val: `${data.satisfaction}%`, icon: "⭐" },
                        { label: "Score", val: `${data.score}/100`, icon: "🎯" },
                    ].map((m) => (
                        <div key={m.label} className="flex items-center justify-between">
                            <span className="text-[11px] text-slate-500 dark:text-gray-500 flex items-center gap-1.5">
                                <span className="text-xs">{m.icon}</span>
                                {m.label}
                            </span>
                            <span className="text-xs font-semibold text-slate-900 dark:text-white tabular-nums">{m.val}</span>
                        </div>
                    ))}
                </div>

                {/* Performance bar */}
                <div className="mt-3 pt-2 border-t border-slate-200 dark:border-white/5">
                    <div className="flex justify-between text-[10px] text-slate-500 dark:text-gray-500 mb-1">
                        <span>Performance</span>
                        <span className="font-semibold" style={{ color: C.primary }}>{data.score}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-slate-200 dark:bg-white/5 overflow-hidden">
                        <div
                            className="h-full rounded-full transition-all duration-500 ease-out"
                            style={{
                                background: C.gradient,
                                width: hovered ? `${data.score}%` : "0%"
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════════════════
   ANIMATED 3D BAR
   ═══════════════════════════════════════════════════════ */
function AnalyticsBar({ data, maxValue, index, peakValue, chartHeight }) {
    const [hovered, setHovered] = useState(false);
    const heightPct = (data.value / maxValue) * 100;
    const isPeak = data.value === peakValue;
    const isHighPerformer = data.value >= maxValue * 0.8;

    return (
        <div
            className="relative flex flex-col items-center flex-1 min-w-0 group"
        >
            {/* Floating mini-dashboard on hover */}
            <MiniDashboard data={data} isPeak={isPeak} hovered={hovered} />

            {/* Floating value label */}
            <div
                className="flex flex-col items-center mb-1.5 sm:mb-2 transition-transform duration-300"
                style={{
                    transform: hovered ? "translateY(-6px) scale(1.1)" : "translateY(0) scale(1)"
                }}
            >
                <span
                    className="hidden sm:block text-[11px] font-semibold tabular-nums transition-colors duration-300"
                    style={{ color: hovered ? C.primary : isPeak ? C.primary : "#64748b" }}
                >
                    {data.value >= 1000 ? (data.value / 1000).toFixed(1) + 'k' : data.value}
                </span>
                {isPeak && (
                    <span
                        className="hidden sm:block text-[7px] sm:text-[8px] font-semibold uppercase tracking-widest mt-0.5"
                        style={{ color: C.primary }}
                    >
                        Record
                    </span>
                )}
            </div>

            {/* Bar container */}
            <div
                className="relative w-full flex items-end justify-center"
                style={{ height: chartHeight }}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            >
                {/* 2D bar */}
                <div
                    className="relative w-full max-w-[48px] rounded-t-xl cursor-pointer overflow-hidden transition-transform duration-300"
                    style={{
                        background: hovered ? C.barGradientHover : C.barGradient,
                        height: `${heightPct}%`,
                        transform: hovered ? "scale(1.05, 1.02)" : "scale(1, 1)"
                    }}
                >
                    {/* Glassmorphism overlay */}
                    <div className="absolute inset-0 bg-white/[0.04] rounded-t-xl" />

                    {/* Shimmer sweep */}
                    <div className="absolute inset-0 overflow-hidden rounded-t-xl">
                        <div
                            className="absolute inset-0 animate-shimmer"
                            style={{ background: "linear-gradient(180deg, transparent, rgba(255,255,255,0.05), transparent)" }}
                        />
                    </div>

                    {/* Subtle glow on hover */}
                    <div
                        className="absolute inset-0 rounded-t-xl transition-opacity duration-300"
                        style={{
                            opacity: hovered ? 1 : 0,
                            boxShadow: isPeak
                                ? `0 0 20px ${C.primaryGlow}, 0 0 40px ${C.primaryDim}`
                                : `0 0 14px ${C.primaryDim}`,
                        }}
                    />

                    {/* Bottom glow line */}
                    <div
                        className="absolute bottom-0 left-0 right-0 h-[1px]"
                        style={{
                            background: `linear-gradient(90deg, transparent, ${C.primary}60, transparent)`,
                        }}
                    />
                </div>

                {/* Data point at top of bar */}
                <div
                    className="absolute z-10"
                    style={{ bottom: `${heightPct}%` }}
                >
                    <div
                        className="w-1.5 sm:w-2.5 h-1.5 sm:h-2.5 rounded-full"
                        style={{
                            border: `2px solid ${isPeak ? C.primary : `${C.primary}80`}`,
                            background: isPeak ? C.primary : `${C.primary}60`,
                            boxShadow: isPeak ? `0 0 8px ${C.primaryGlow}` : `0 0 4px ${C.primaryDim}`,
                        }}
                    />
                </div>
            </div>

            {/* Month label */}
            <span
                className="mt-2 sm:mt-3 text-[7px] sm:text-[11px] uppercase tracking-wider font-medium transition-colors duration-300 block -rotate-45 sm:rotate-0 origin-top-left"
                style={{ color: hovered ? C.primary : isPeak ? C.primary : "#475569" }}
            >
                {data.month}
            </span>

            {/* Growth indicator dot */}
            {isHighPerformer && (
                <div
                    className="mt-1 w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full animate-dataPulse"
                    style={{ background: C.primary, animationDelay: `${index * 0.4}s` }}
                />
            )}
        </div>
    );
}

/* ═══════════════════════════════════════════════════════
   TREND LINE (SVG connecting bar tops)
   ═══════════════════════════════════════════════════════ */
function TrendLine({ data, maxValue, chartHeight }) {
    const barCount = data.length;
    const chartH = chartHeight;

    const points = data.map((d, i) => {
        const x = ((i + 0.5) / barCount) * 100;
        const y = 100 - (d.value / maxValue) * 100;
        return `${x},${y}`;
    });

    const pathD = points.reduce((acc, pt, i) => {
        if (i === 0) return `M ${pt}`;
        const [px, py] = points[i - 1].split(",");
        const [cx, cy] = pt.split(",");
        const cpx = (parseFloat(px) + parseFloat(cx)) / 2;
        return `${acc} C ${cpx},${py} ${cpx},${cy} ${cx},${cy}`;
    }, "");

    return (
        <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="absolute inset-0 w-full pointer-events-none"
            style={{ height: chartH }}
        >
            <defs>
                <linearGradient id="trendGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor={C.primary} />
                    <stop offset="50%" stopColor={C.secondary} />
                    <stop offset="100%" stopColor={C.accent} />
                </linearGradient>
                <filter id="trendGlow">
                    <feGaussianBlur stdDeviation="1" result="blur" />
                    <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>
            {/* Glow layer */}
            <path
                d={pathD}
                fill="none"
                stroke="url(#trendGrad)"
                strokeWidth="0.6"
                strokeLinecap="round"
                filter="url(#trendGlow)"
            />
            {/* Main line */}
            <path
                d={pathD}
                fill="none"
                stroke="url(#trendGrad)"
                strokeWidth="0.3"
                strokeLinecap="round"
                opacity={0.5}
            />
        </svg>
    );
}

/* ═══════════════════════════════════════════════════════
   NETWORK LINES (connecting adjacent data points)
   ═══════════════════════════════════════════════════════ */
function NetworkLines({ data, maxValue, chartHeight }) {
    const barCount = data.length;
    const chartH = chartHeight;

    const coords = data.map((d, i) => ({
        x: ((i + 0.5) / barCount) * 100,
        y: 100 - (d.value / maxValue) * 100,
    }));

    return (
        <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="absolute inset-0 w-full pointer-events-none"
            style={{ height: chartH, opacity: 0.1 }}
        >
            {coords.map((c, i) =>
                coords.slice(i + 1, i + 3).map((c2, j) => (
                    <line
                        key={`${i}-${j}`}
                        x1={c.x}
                        y1={c.y}
                        x2={c2.x}
                        y2={c2.y}
                        stroke={C.primary}
                        strokeWidth="0.12"
                        strokeDasharray="1 1.5"
                    />
                ))
            )}
        </svg>
    );
}

/* ═══════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════ */
export default function StatsDashboard() {
    const containerRef = useRef(null);
    const chartRef = useRef(null);

    const maxValue = useMemo(() => Math.max(...histogramData.map((d) => d.value)), []);
    const peakValue = maxValue;

    // Responsive chart height using CSS custom properties to avoid client-side resize checking JS
    const chartHeight = "var(--chart-height, 260px)";

    const displayData = histogramData;

    /* Live value simulation */
    const [liveCount, setLiveCount] = useState(14580);
    useEffect(() => {
        const id = setInterval(() => {
            setLiveCount((p) => p + Math.floor(Math.random() * 5) + 1);
        }, 4000);
        return () => clearInterval(id);
    }, []);



    return (
        <section
            ref={containerRef}
            className="relative py-[clamp(1.5rem,4vw,4.5rem)] overflow-hidden bg-background transition-colors duration-300"
        >
            {/* Background ambience */}
            <BackgroundEffect />

            {/* ═══ Section header ═══ */}
            <div className="relative z-10 text-center max-w-3xl mx-auto px-6 mb-8 md:mb-12">
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-foreground mb-3 md:mb-4">
                    Business Intelligence{" "}
                    <span
                        className="bg-clip-text text-transparent font-semibold"
                        style={{ backgroundImage: C.gradient }}
                    >
                        Command Center
                    </span>
                </h2>
                <p className="text-slate-600 dark:text-gray-500 text-sm sm:text-base leading-relaxed">
                    Real-time analytics tracking{" "}
                    <motion.span
                        className="font-semibold tabular-nums"
                        style={{ color: C.primary }}
                        key={liveCount}
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        {liveCount.toLocaleString()}
                    </motion.span>{" "}
                    data points across our global operations
                </p>
            </div>

            <div
                className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
                {counters.map((c) => (
                    <div key={c.id}>
                        <Counter3D
                            icon={c.icon}
                            value={c.value}
                            suffix={c.suffix}
                            label={c.label}
                        />
                    </div>
                ))}
            </div>

            {/* ═══ Analytics dashboard ═══ */}
            <div
                className="relative z-10 max-w-7xl mx-auto px-6 mt-8 md:mt-12"
            >
                {/* Live status */}
                <LiveStatusBar />

                {/* Dashboard container */}
                <div
                    className="relative mt-5 rounded-3xl backdrop-blur-2xl overflow-hidden bg-slate-50 dark:bg-[#0a1225]/80 border border-slate-200 dark:border-white/[0.04]"
                    style={{
                        boxShadow: `0 0 80px ${C.primary}06`,
                    }}
                >
                    {/* Holographic background */}
                    <HolographicCore />

                    {/* ── KPI cards ── */}
                    <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 p-4 md:p-6 lg:p-8 pb-0 md:pb-2">
                        {kpis.map((kpi, idx) => (
                            <KPIWidget
                                key={kpi.label}
                                label={kpi.label}
                                value={kpi.value}
                                color={kpi.color}
                                trend={kpi.trend}
                                icon={kpi.icon}
                                index={idx}
                            />
                        ))}
                    </div>

                    {/* ── Chart section ── */}
                    <div ref={chartRef} className="relative z-10 px-4 md:px-6 lg:px-8 pt-6 md:pt-4 pb-5 md:pb-6 lg:pb-8">
                        {/* Chart header */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 md:mb-8 gap-3">
                            <div>
                                <div className="flex items-center gap-3">
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">Growth Analytics</h3>
                                    <motion.div
                                        className="flex items-center gap-1.5 px-2.5 py-1 rounded-full"
                                        style={{
                                            background: `${C.primary}08`,
                                            border: `1px solid ${C.primary}20`,
                                        }}
                                        animate={{ opacity: [0.7, 1, 0.7] }}
                                        transition={{ repeat: Infinity, duration: 2 }}
                                    >
                                        <div className="w-1.5 h-1.5 rounded-full" style={{ background: C.primary }} />
                                        <span className="text-[10px] font-semibold uppercase" style={{ color: C.primary }}>Live</span>
                                    </motion.div>
                                </div>
                                <p className="text-sm text-slate-500 dark:text-gray-500 mt-1">
                                    Monthly project delivery &amp; revenue performance — 2024
                                </p>
                            </div>
                            <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-gray-500">
                                <span className="flex items-center gap-1.5">
                                    <span className="w-3 h-3 rounded-sm inline-block" style={{ background: C.barGradient }} />
                                    Projects
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <span className="w-3 h-0.5 inline-block rounded" style={{ background: C.gradient }} />
                                    Trend
                                </span>
                            </div>
                        </div>

                        {/* Chart area */}
                        <div className="relative">
                            {/* Horizontal grid lines with Y-axis labels */}
                            {[0, 25, 50, 75, 100].map((pct) => (
                                <div
                                    key={pct}
                                    className="absolute left-0 right-0 flex items-center pointer-events-none"
                                    style={{ bottom: `calc(${(pct / 100)} * ${chartHeight})` }}
                                >
                                    <span className={`text-[8px] sm:text-[9px] text-slate-600 dark:text-gray-300 tabular-nums w-6 sm:w-8 text-right mr-2 sm:mr-3 -translate-y-1/2 ${pct === 25 || pct === 75 ? 'hidden sm:block' : 'block'}`}>
                                        {Math.round((pct / 100) * maxValue).toLocaleString()}
                                    </span>
                                    <div className="flex-1 border-t border-white/[0.03]" />
                                </div>
                            ))}

                            {/* SVG layers */}
                            <div className="ml-8 sm:ml-11 pb-2 sm:pb-0">
                                <div className="relative w-full">
                                    <NetworkLines data={displayData} maxValue={maxValue} chartHeight={chartHeight} />
                                    <TrendLine data={displayData} maxValue={maxValue} chartHeight={chartHeight} />

                                    {/* Bars */}
                                    <div className="relative flex items-end justify-between w-full h-full gap-[2px] sm:gap-2 lg:gap-3 px-1 sm:px-0">
                                        {displayData.map((d, i) => (
                                            <AnalyticsBar
                                                key={d.month}
                                                data={d}
                                                maxValue={maxValue}
                                                index={i}
                                                peakValue={peakValue}
                                                chartHeight={chartHeight}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Bottom summary strip */}
                        <div
                            className="mt-6 pt-4 border-t border-slate-200 dark:border-white/[0.04] grid grid-cols-2 gap-4 sm:flex sm:items-center sm:justify-between"
                        >
                            <div className="flex flex-wrap items-center gap-4 sm:gap-6 col-span-2 sm:col-span-1">
                                <div>
                                    <p className="text-[9px] sm:text-[10px] text-slate-500 dark:text-gray-500 uppercase tracking-widest font-medium">Total Output</p>
                                    <p className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white tabular-nums tracking-tight mt-0.5">
                                        {histogramData.reduce((a, d) => a + d.value, 0).toLocaleString()}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-[9px] sm:text-[10px] text-slate-500 dark:text-gray-500 uppercase tracking-widest font-medium">Avg / Month</p>
                                    <p className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white tabular-nums tracking-tight mt-0.5">
                                        {Math.round(histogramData.reduce((a, d) => a + d.value, 0) / 12).toLocaleString()}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-[9px] sm:text-[10px] text-slate-500 dark:text-gray-500 uppercase tracking-widest font-medium">Peak</p>
                                    <p className="text-sm sm:text-base font-semibold tabular-nums tracking-tight mt-0.5" style={{ color: C.primary }}>
                                        {maxValue >= 1000 ? (maxValue / 1000).toFixed(1) + 'k' : maxValue} <span className="text-[9px] text-slate-400 dark:text-gray-400 font-medium">Dec</span>
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 text-[10px] text-slate-500 dark:text-gray-500 col-span-2 sm:col-span-1">
                                <span className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-white/[0.02] border border-slate-200 dark:border-white/[0.05]">
                                    <svg className="w-3 h-3" style={{ color: C.primary }} viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                                    </svg>
                                    +233% YoY Growth
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
