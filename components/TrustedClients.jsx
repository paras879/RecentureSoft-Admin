"use client";
import { useState, useEffect } from "react";
import { TECH_ICONS, MARQUEE_TECH_LIST } from "./TechStack";

/* ═══════════════════════════════════════════════════════
   COLOR TOKENS
   ═══════════════════════════════════════════════════════ */
const C = {
  primary: "#06E6FF",
  secondary: "#3B82F6",
  accent: "#8B5CF6",
  navy: "#020617",
  gradient: "linear-gradient(135deg, #06E6FF, #3B82F6, #8B5CF6)",
};

/* ═══════════════════════════════════════════════════════
   CUSTOM SVG LOGOS
   ═══════════════════════════════════════════════════════ */
const Logos = [
  {
    name: "Supertech",
    svg: (
      <svg viewBox="0 0 120 30" className="h-7 w-auto fill-current">
        <path d="M15 5 L25 5 L20 15 L30 15 L15 28 L18 18 L8 18 Z" fill="url(#grad1)" />
        <text x="35" y="22" className="text-xl font-bold tracking-tight" fill="currentColor">Supertech</text>
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={C.primary} />
            <stop offset="100%" stopColor={C.secondary} />
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  {
    name: "Aurobindo",
    svg: (
      <svg viewBox="0 0 120 30" className="h-7 w-auto fill-current">
        <circle cx="15" cy="15" r="10" fill="none" stroke="url(#grad2)" strokeWidth="3" />
        <circle cx="20" cy="15" r="10" fill="none" stroke="currentColor" strokeWidth="1" strokeOpacity="0.5" />
        <text x="38" y="22" className="text-xl font-bold tracking-wide" fill="currentColor">Aurobindo</text>
        <defs>
          <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={C.secondary} />
            <stop offset="100%" stopColor={C.accent} />
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  {
    name: "Flaxley Tyres",
    svg: (
      <svg viewBox="0 0 140 30" className="h-7 w-auto fill-current">
        <path d="M10 5 Q 25 5 25 15 T 10 25 Z" fill="url(#grad3)" />
        <path d="M15 5 Q 30 5 30 15 T 15 25 Z" fill="none" stroke="currentColor" strokeWidth="2" strokeOpacity="0.5" />
        <text x="38" y="22" className="text-xl font-bold italic tracking-tighter" fill="currentColor">Flaxley Tyres</text>
        <defs>
          <linearGradient id="grad3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={C.accent} />
            <stop offset="100%" stopColor={C.primary} />
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  {
    name: "ExxonMobil",
    svg: (
      <svg viewBox="0 0 140 30" className="h-7 w-auto fill-current">
        <rect x="5" y="5" width="20" height="20" rx="4" fill="url(#grad4)" />
        <path d="M10 10 L20 20 M20 10 L10 20" stroke="#020617" strokeWidth="3" strokeLinecap="round" />
        <text x="35" y="22" className="text-xl font-bold tracking-normal" fill="currentColor">ExxonMobil</text>
        <defs>
          <linearGradient id="grad4" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={C.primary} />
            <stop offset="100%" stopColor={C.accent} />
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  {
    name: "GoGuardian",
    svg: (
      <svg viewBox="0 0 140 30" className="h-7 w-auto fill-current">
        <path d="M15 2 L28 8 L28 20 Q15 28 15 28 Q2 20 2 8 Z" fill="url(#grad5)" />
        <circle cx="15" cy="13" r="4" fill="#020617" />
        <text x="36" y="22" className="text-xl font-bold tracking-tight" fill="currentColor">GoGuardian</text>
        <defs>
          <linearGradient id="grad5" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={C.secondary} />
            <stop offset="100%" stopColor={C.primary} />
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  {
    name: "Vertex",
    svg: (
      <svg viewBox="0 0 110 30" className="h-7 w-auto fill-current">
        <path d="M5 25 L15 5 L25 25" fill="none" stroke="url(#grad6)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M15 15 L25 5 L35 25" fill="none" stroke="currentColor" strokeWidth="2" strokeOpacity="0.4" strokeLinecap="round" strokeLinejoin="round" />
        <text x="40" y="22" className="text-xl font-bold uppercase tracking-widest" fill="currentColor">Vertex</text>
        <defs>
          <linearGradient id="grad6" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={C.primary} />
            <stop offset="100%" stopColor={C.secondary} />
          </linearGradient>
        </defs>
      </svg>
    ),
  },
];

/* ═══════════════════════════════════════════════════════
   ANIMATED COUNTER
   ═══════════════════════════════════════════════════════ */
function Counter({ prefix = "", value, suffix, label, icon, showExitIcon = false, variant = "card" }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const target = parseFloat(value);
    if (isNaN(target)) {
      setDisplayValue(value);
      return;
    }

    const isFloat = value.toString().includes(".");
    const decimalPlaces = isFloat ? value.toString().split(".")[1].length : 0;

    const duration = 1200; // ms
    const startTime = performance.now();

    function update(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3); // Ease out cubic
      const current = ease * target;
      setDisplayValue(current.toFixed(decimalPlaces));

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        setDisplayValue(value);
      }
    }

    requestAnimationFrame(update);
  }, [value]);

  if (variant === "clean") {
    return (
      <div className="group relative flex flex-col items-center select-none w-full text-center">
        {/* Row containing Icon and Metric */}
        <div className="flex items-center gap-2.5 mb-1.5 justify-center">
          {/* Icon Circle Badge */}
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-cyan-100/70 dark:bg-cyan-950/40 text-cyan-600 dark:text-cyan-400 group-hover:scale-110 group-hover:bg-cyan-500/20 dark:group-hover:bg-cyan-500/30 transition-all duration-300">
            {icon}
          </div>

          {/* Metric value */}
          <div className="flex items-baseline gap-0.5 z-10">
            {prefix && <span className="text-xl sm:text-2xl font-extrabold text-cyan-600 dark:text-cyan-400 mr-0.5 tracking-tight">{prefix}</span>}
            <span className="text-2xl sm:text-3xl font-extrabold text-cyan-600 dark:text-cyan-400">
              {displayValue}
            </span>
            {suffix && <span className="text-xl sm:text-2xl font-extrabold text-cyan-600 dark:text-cyan-400 ml-0.5 tracking-tight">{suffix}</span>}
          </div>
        </div>

        {/* Label */}
        <span className="text-[10px] text-slate-500 dark:text-gray-400 mt-0.5 uppercase tracking-wider font-bold text-center z-10 transition-colors group-hover:text-slate-900 dark:group-hover:text-white">
          {label}
        </span>
      </div>
    );
  }

  return (
    <div className={`group relative flex flex-col items-center justify-center rounded-2xl bg-white dark:bg-[#0b1329]/60 border border-slate-200/60 dark:border-white/[0.04] shadow-sm hover:border-blue-400/40 dark:hover:border-cyan-500/30 hover:shadow-[0_12px_24px_-5px_rgba(6,230,255,0.05)] hover:-translate-y-0.5 transition-all duration-300 w-full select-none h-[135px] ${showExitIcon ? "pt-4 pb-7 px-5" : "p-5"}`}>
      {/* Ambient background card glow */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/0 via-cyan-500/0 to-cyan-500/0 group-hover:to-cyan-500/[0.02] transition-all duration-500 pointer-events-none" />

      {/* Icon Badge */}
      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 group-hover:scale-110 group-hover:bg-blue-500/10 dark:group-hover:bg-blue-500/25 transition-all duration-300 mb-2">
        {icon}
      </div>

      {/* Metric value */}
      <div className="flex items-baseline gap-0.5 z-10">
        {prefix && <span className="text-lg sm:text-xl font-bold text-blue-600 dark:text-cyan-400 mr-0.5 tracking-tight">{prefix}</span>}
        <span className="text-2xl sm:text-3xl font-extrabold text-blue-600 dark:text-cyan-400">
          {displayValue}
        </span>
        {suffix && <span className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-cyan-400 ml-0.5 tracking-tight">{suffix}</span>}
      </div>

      {/* Label */}
      <span className="text-[10px] text-slate-500 dark:text-gray-400 mt-1 uppercase tracking-wider font-bold text-center z-10 transition-colors group-hover:text-slate-900 dark:group-hover:text-white">
        {label}
      </span>

      {/* Exit Document Icon Badge for S-line flow */}
      {showExitIcon && (
        <div className="absolute -bottom-3.5 left-1/2 -translate-x-1/2 w-6 h-7 bg-white dark:bg-[#0b1329] border border-slate-200/60 dark:border-white/10 rounded shadow-[0_4px_12px_rgba(0,0,0,0.06)] flex items-center justify-center z-20 group-hover:scale-110 transition-transform duration-300">
          <svg className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
          </svg>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   PREMIUM LOGO CARD (CSS Optimized)
   ═══════════════════════════════════════════════════════ */
function LogoCard({ logo }) {
  return (
    <div
      className="group relative flex-shrink-0 w-[180px] h-[75px] rounded-2xl cursor-pointer transition-transform duration-300 hover:scale-[1.03] active:scale-95 hover:z-20"
    >
      <div
        className="absolute inset-0 rounded-2xl overflow-hidden flex items-center justify-center transition-all duration-500 bg-slate-50/80 dark:bg-[#0a1225]/80 border border-slate-200 dark:border-white/[0.05] group-hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.15)] shadow-[0_4px_20px_rgba(0,0,0,0.05)]"
      >
        {/* Ambient glow beneath logo */}
        <div
          className="absolute pointer-events-none z-0 rounded-full w-[80%] h-[80%] opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle,rgba(6,230,255,0.2),transparent_70%)] blur-[15px]"
        />

        {/* Logo container */}
        <div
          className="relative z-10 transition-all duration-500 text-slate-500 dark:text-gray-500 group-hover:text-slate-900 dark:group-hover:text-white group-hover:scale-105"
        >
          {logo.svg}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   INFINITE MARQUEE (CSS Optimized)
   ═══════════════════════════════════════════════════════ */
function InfiniteMarquee() {
  const duplicatedLogos = [...Logos, ...Logos, ...Logos, ...Logos, ...Logos, ...Logos];

  return (
    <div className="relative overflow-hidden py-10 w-full hover-pause mask-grad select-none">
      {/* Edge fade masks */}
      <div className="absolute left-0 top-0 bottom-0 w-32 z-20 pointer-events-none bg-gradient-to-r from-background to-transparent" />
      <div className="absolute right-0 top-0 bottom-0 w-32 z-20 pointer-events-none bg-gradient-to-l from-background to-transparent" />

      <div className="flex gap-8 px-4 w-max animate-infinite-marquee">
        {duplicatedLogos.map((logo, idx) => (
          <LogoCard key={`${logo.name}-${idx}`} logo={logo} />
        ))}
      </div>

      {/* Embedded styles for GPU-accelerated seamless loops and side masks */}
      <style dangerouslySetInnerHTML={{
        __html: `
          .mask-grad {
              mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
              -webkit-mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
          }
          .hover-pause:hover .animate-infinite-marquee,
          .hover-pause:hover .animate-infinite-marquee-reverse {
              animation-play-state: paused;
          }
          @keyframes infinite-marquee {
              0% { transform: translate3d(0, 0, 0); }
              100% { transform: translate3d(-50%, 0, 0); }
          }
          .animate-infinite-marquee {
              animation: infinite-marquee 40s linear infinite;
              will-change: transform;
          }
          @keyframes infinite-marquee-reverse {
              0% { transform: translate3d(-50%, 0, 0); }
              100% { transform: translate3d(0, 0, 0); }
          }
          .animate-infinite-marquee-reverse {
              animation: infinite-marquee-reverse 35s linear infinite;
              will-change: transform;
          }
          @keyframes pipelineFlow {
              to {
                  stroke-dashoffset: -72;
              }
          }
      `}} />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════ */
export default function TrustedClients() {
  return (
    <section className="relative py-2 md:py-4 lg:py-6 overflow-hidden bg-background border-b border-slate-200 dark:border-white/5 transition-colors duration-300">
      {/* Ambient Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Aurora */}
        <div className="absolute top-0 left-1/4 w-[800px] h-[600px] rounded-full opacity-[0.03]" style={{ background: `radial-gradient(ellipse, ${C.primary}, transparent 70%)`, filter: "blur(120px)" }} />
        <div className="absolute bottom-0 right-1/4 w-[800px] h-[600px] rounded-full opacity-[0.03]" style={{ background: `radial-gradient(ellipse, ${C.accent}, transparent 70%)`, filter: "blur(120px)" }} />

        {/* Animated grid pattern */}
        <div className="absolute inset-0 opacity-[0.015] mix-blend-screen" style={{ backgroundImage: `linear-gradient(${C.primary}10 1px, transparent 1px), linear-gradient(90deg, ${C.primary}10 1px, transparent 1px)`, backgroundSize: "40px 40px", transform: "perspective(1000px) rotateX(60deg) translateY(-100px) translateZ(-200px)" }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 mb-[clamp(1rem,2vw,2rem)]">
        {/* Performance Dashboard Header */}
        <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-4 mb-4 text-center sm:text-left border-b border-slate-200 dark:border-white/5 pb-2">
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Performance Dashboard
          </h2>
        </div>

        {/* Live Counters & Performance Stats - Bento Grid */}
        <div className="relative mt-4 grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto items-stretch">

          {/* Animated Connecting Pipeline SVG - Desktop Only */}
          <div className="absolute inset-0 pointer-events-none z-20 hidden lg:block overflow-visible">
            <svg className="absolute w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="pipelineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3B82F6" />
                  <stop offset="50%" stopColor="#06E6FF" />
                  <stop offset="100%" stopColor="#06E6FF" />
                </linearGradient>
                <filter id="glowPipeline" x1="-20%" y1="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#06E6FF" floodOpacity="0.5" />
                </filter>
              </defs>

              {/* S-shaped pipeline path from left card bottom (Client Satisfaction) to top card in the right panel */}
              {/* S-shaped pipeline path from left card bottom (Client Satisfaction) to top card in the right panel */}
              <path
                d="M 242 650
     L 460 650
     C 485 650, 496 640, 496 610
     L 496 520
     L 496 253
     C 496 208, 540 208, 580 208
     L 770 208"
                stroke="url(#pipelineGrad)"
                strokeWidth="4"
                strokeLinecap="round"
                opacity="0.25"
                className="dark:opacity-15"
              />

              {/* Animated flowing dash overlay */}
              <path
                d="M 242 650
     L 460 650
     C 485 650, 496 640, 496 610
     L 496 520
     L 496 253
     C 496 208, 540 208, 580 208
     L 770 208"
                stroke="url(#pipelineGrad)"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray="12 24"
                filter="url(#glowPipeline)"
                style={{ animation: "pipelineFlow 3s linear infinite" }}
              />

              {/* Flowing animated data packet document icons */}
              <g filter="url(#glowPipeline)">
                <animateMotion dur="6s" repeatCount="indefinite" path="M 242 650
     L 460 650
     C 485 650, 496 640, 496 610
     L 496 520
     L 496 253
     C 496 208, 540 208, 580 208
     L 770 208" />
                <rect x="-6" y="-8" width="12" height="16" rx="1.5" fill="white" stroke="#06E6FF" strokeWidth="1.2" />
                <line x1="-3" y1="-2" x2="3" y2="-2" stroke="#06E6FF" strokeWidth="1" strokeLinecap="round" />
                <line x1="-3" y1="2" x2="3" y2="2" stroke="#06E6FF" strokeWidth="1" strokeLinecap="round" />
              </g>
              <g filter="url(#glowPipeline)">
                <animateMotion dur="6s" begin="2s" repeatCount="indefinite" path="M 242 650
     L 460 650
     C 485 650, 496 640, 496 610
     L 496 520
     L 496 253
     C 496 208, 540 208, 580 208
     L 770 208" />
                <rect x="-6" y="-8" width="12" height="16" rx="1.5" fill="white" stroke="#3B82F6" strokeWidth="1.2" />
                <line x1="-3" y1="-2" x2="3" y2="-2" stroke="#3B82F6" strokeWidth="1" strokeLinecap="round" />
                <line x1="-3" y1="2" x2="3" y2="2" stroke="#3B82F6" strokeWidth="1" strokeLinecap="round" />
              </g>
              <g filter="url(#glowPipeline)">
                <animateMotion dur="6s" begin="4s" repeatCount="indefinite" path="M 242 650
     L 460 650
     C 485 650, 496 640, 496 610
     L 496 520
     L 496 253
     C 496 208, 540 208, 580 208
     L 770 208" />
                <rect x="-6" y="-8" width="12" height="16" rx="1.5" fill="white" stroke="#8B5CF6" strokeWidth="1.2" />
                <line x1="-3" y1="-2" x2="3" y2="-2" stroke="#8B5CF6" strokeWidth="1" strokeLinecap="round" />
                <line x1="-3" y1="2" x2="3" y2="2" stroke="#8B5CF6" strokeWidth="1" strokeLinecap="round" />
              </g>
            </svg>
          </div>

          {/* Business Scale Bento Card (5 Columns) */}
          <div className="lg:col-span-5 h-full relative rounded-3xl p-6 md:p-8 bg-white dark:bg-[#0B1220] border border-blue-200/50 dark:border-blue-900/30 backdrop-blur-xl shadow-lg flex flex-col justify-between overflow-hidden lg:overflow-visible group z-10 transition-all duration-300 hover:border-blue-400/40">
            {/* Ambient Background Glow */}
            <div className="absolute top-0 left-0 w-60 h-60 rounded-full opacity-[0.03] dark:opacity-[0.05] pointer-events-none" style={{ background: `radial-gradient(circle, ${C.secondary}, transparent 70%)`, filter: "blur(40px)" }} />

            <div className="relative z-10 flex flex-col h-full justify-between">
              {/* Card Header */}
              <div className="mb-8 text-left">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100/50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/10 text-blue-600 dark:text-blue-400 font-bold text-[10px] tracking-wider uppercase mb-3 select-none">
                  📁 Scale & Impact
                </span>
                <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-2">
                  Company Scale
                </h3>
                <p className="text-xs text-slate-500 dark:text-gray-400 max-w-sm">
                  Proven track record of delivering successful digital products for global enterprise brands.
                </p>
              </div>

              {/* Stats Layout */}
              <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4 mt-auto">
                <Counter
                  value="500"
                  suffix="+"
                  label="Projects Delivered"
                  variant="card"
                  icon={
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                    </svg>
                  }
                />
                <Counter
                  value="120"
                  suffix="+"
                  label="Enterprise Clients"
                  variant="card"
                  icon={
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
                      <line x1="9" y1="22" x2="9" y2="16" />
                      <line x1="15" y1="22" x2="15" y2="16" />
                      <line x1="9" y1="16" x2="15" y2="16" />
                      <path d="M8 6h.01M16 6h.01M8 10h.01M16 10h.01M12 6h.01M12 10h.01" />
                    </svg>
                  }
                />
                <div className="sm:col-span-1 lg:col-span-1">
                  <Counter
                    value="98"
                    suffix="%"
                    label="Client Satisfaction"
                    showExitIcon={true}
                    variant="card"
                    icon={
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        <path d="m9 11 2 2 4-4" />
                      </svg>
                    }
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Infrastructure Stats Bento Card (7 Columns) */}
          <div className="lg:col-span-7 h-full relative rounded-3xl p-6 md:p-8 bg-cyan-50/40 dark:bg-[#041a1c]/30 border border-cyan-200/50 dark:border-cyan-900/30 backdrop-blur-xl shadow-lg flex flex-col justify-between overflow-hidden lg:overflow-visible group z-10 transition-all duration-300 hover:border-cyan-400/40">
            {/* Ambient Background Glow */}
            <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full opacity-[0.03] dark:opacity-[0.05] pointer-events-none" style={{ background: `radial-gradient(circle, ${C.primary}, transparent 70%)`, filter: "blur(60px)" }} />

            <div className="relative z-10 flex flex-col h-full justify-between">
              {/* Card Header */}
              <div className="mb-8 text-left">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-100/50 dark:bg-cyan-950/20 border border-cyan-200 dark:border-cyan-900/10 text-cyan-600 dark:text-cyan-400 font-bold text-[10px] tracking-wider uppercase mb-3 select-none">
                  ⚡ Performance & Speed
                </span>
                <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-2">
                  System Architecture Metrics
                </h3>
                <p className="text-xs text-slate-500 dark:text-gray-400 max-w-md">
                  Optimized for extreme throughput, lightning-fast rendering, and sub-millisecond cloud-scalable responses.
                </p>
              </div>

              {/* Desktop Diamond Network Graph Layout */}
              <div className="hidden lg:block relative w-full h-[460px] mt-4 select-none">
                {/* SVG Graph Lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 600 460" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <marker id="networkArrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 1.5 L 8 5 L 0 8.5 Z" fill="currentColor" className="text-slate-400 dark:text-slate-600" />
                    </marker>
                  </defs>

                  {/* Node 1 (Top Center) -> Node 2 (Middle Left) */}
                  <path d="M 300 80 L 300 120 Q 300 130 290 130 L 160 130 Q 150 130 150 140 L 150 190" stroke="currentColor" className="text-slate-300 dark:text-slate-700" strokeWidth="1.5" markerEnd="url(#networkArrow)" />

                  {/* Node 1 (Top Center) -> Node 3 (Middle Right) */}
                  <path d="M 300 80 L 300 120 Q 300 130 310 130 L 440 130 Q 450 130 450 140 L 450 190" stroke="currentColor" className="text-slate-300 dark:text-slate-700" strokeWidth="1.5" markerEnd="url(#networkArrow)" />

                  {/* Node 3 (Middle Right) -> Node 4 (Bottom Left) */}
                  <path d="M 450 250 L 450 280 Q 450 290 440 290 L 160 290 Q 150 290 150 300 L 150 330" stroke="currentColor" className="text-slate-300 dark:text-slate-700" strokeWidth="1.5" markerEnd="url(#networkArrow)" />
                </svg>

                {/* Arrows between left and right nodes */}
                <div className="absolute top-[210px] left-[50%] -translate-x-1/2 text-slate-300 dark:text-slate-600">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
                <div className="absolute top-[350px] left-[50%] -translate-x-1/2 text-slate-300 dark:text-slate-600">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>

                {/* Nodes (Grid Positions matching Mockup) */}
                {/* Node 1: Top Center */}
                <div className="absolute top-[3px] left-[50%] -translate-x-1/2 w-[170px]">
                  <Counter
                    value="99.9"
                    suffix="%"
                    label="Production Uptime"
                    variant="clean"
                    icon={
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                      </svg>
                    }
                  />
                </div>

                {/* Node 2: Middle Left */}
                <div className="absolute top-[190px] left-[25%] -translate-x-1/2 w-[170px]">
                  <Counter
                    value="99.9"
                    suffix="%"
                    label="Production Uptime"
                    variant="clean"
                    icon={
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                      </svg>
                    }
                  />
                </div>

                {/* Node 3: Middle Right */}
                <div className="absolute top-[190px] left-[75%] -translate-x-1/2 w-[170px]">
                  <Counter
                    prefix="<"
                    value="100"
                    suffix="ms"
                    label="API Latency"
                    variant="clean"
                    icon={
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                      </svg>
                    }
                  />
                </div>

                {/* Node 4: Bottom Left */}
                <div className="absolute top-[330px] left-[25%] -translate-x-1/2 w-[170px]">
                  <Counter
                    value="10"
                    suffix="x"
                    label="Render Speed"
                    variant="clean"
                    icon={
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <path d="m9 12 2 2 4-4" />
                      </svg>
                    }
                  />
                </div>

                {/* Node 5: Bottom Right */}
                <div className="absolute top-[330px] left-[75%] -translate-x-1/2 w-[170px]">
                  <Counter
                    value="100"
                    suffix="%"
                    label="Cloud Scalable"
                    variant="clean"
                    icon={
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17.5 19A5.5 5.5 0 0 0 22 13.5a5.5 5.5 0 0 0-4.5-5.4A8 8 0 0 0 2 12a8 8 0 0 0 6.5 7.8" />
                        <path d="M12 12v6" />
                        <path d="m9 15 3-3 3 3" />
                      </svg>
                    }
                  />
                </div>
              </div>

              {/* Mobile/Tablet Fallback Grid Layout */}
              <div className="lg:hidden grid grid-cols-2 gap-4 w-full mt-6">
                <Counter
                  value="99.9"
                  suffix="%"
                  label="Production Uptime"
                  variant="card"
                  icon={
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                    </svg>
                  }
                />
                <Counter
                  prefix="<"
                  value="100"
                  suffix="ms"
                  label="API Latency"
                  variant="card"
                  icon={
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                    </svg>
                  }
                />
                <Counter
                  value="10"
                  suffix="x"
                  label="Render Speed"
                  variant="card"
                  icon={
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <path d="m9 12 2 2 4-4" />
                    </svg>
                  }
                />
                <Counter
                  value="100"
                  suffix="%"
                  label="Cloud Scalable"
                  variant="card"
                  icon={
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.5 19A5.5 5.5 0 0 0 22 13.5a5.5 5.5 0 0 0-4.5-5.4A8 8 0 0 0 2 12a8 8 0 0 0 6.5 7.8" />
                      <path d="M12 12v6" />
                      <path d="m9 15 3-3 3 3" />
                    </svg>
                  }
                />
              </div>
            </div>
          </div>

        </div>
      </div>

      <div className="relative z-10 mt-10 md:mt-16 flex flex-col gap-6">
        <InfiniteMarquee />

        {/* Cinematic Infinite Technology Marquee Ribbon (Moved from TechStack) */}
        <div className="relative w-full overflow-hidden py-4 hover-pause mask-grad select-none">
          {/* Edge fade masks */}
          <div className="absolute left-0 top-0 bottom-0 w-32 z-20 pointer-events-none bg-gradient-to-r from-background to-transparent" />
          <div className="absolute right-0 top-0 bottom-0 w-32 z-20 pointer-events-none bg-gradient-to-l from-background to-transparent" />

          <div className="flex gap-6 w-max animate-infinite-marquee-reverse">
            {[...MARQUEE_TECH_LIST, ...MARQUEE_TECH_LIST, ...MARQUEE_TECH_LIST].map((tech, idx) => {
              const opacityVal = idx % 2 === 0 ? "opacity-85 hover:opacity-100" : "opacity-100";
              const scaleVal = idx % 3 === 0 ? 0.95 : 1;

              return (
                <div
                  key={`${tech.id}-${idx}`}
                  style={{ scale: scaleVal }}
                  className={`flex items-center gap-3 px-4.5 py-2.5 rounded-full border border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-[#0a1225]/50 transition-all duration-300 shadow-sm dark:shadow-md cursor-pointer whitespace-nowrap hover:-translate-y-1 hover:scale-105 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] hover:border-cyan-500/25 hover:bg-white/[0.05] ${opacityVal}`}
                >
                  <div className="w-5 h-5 flex items-center justify-center text-cyan-600 dark:text-cyan-400">
                    {TECH_ICONS[tech.id]}
                  </div>
                  <span className="text-slate-700 dark:text-gray-300 text-xs font-semibold font-sans">
                    {tech.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
