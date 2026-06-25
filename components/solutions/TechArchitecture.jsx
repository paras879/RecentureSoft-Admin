"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Globe, Cloud, Brain, Shield, Cpu, Server, Zap } from "lucide-react";

// Upgraded node data representing system architecture layers
const architectureNodes = [
    {
        id: "frontend",
        label: "User Experience Layer",
        tech: "React • Next.js • Tailwind CSS",
        shortTech: "React, Next.js, Tailwind",
        desc: "Handles UI rendering, responsive layouts, and modern front-end user interactions.",
        icon: "🌐",
        angle: -Math.PI / 2,
        color: "from-cyan-400 to-blue-500",
        shadow: "shadow-[0_0_30px_rgba(34,211,238,0.25)]",
        glowColor: "rgba(34,211,238,0.2)",
        status: "Active",
        iconComponent: Globe
    },
    {
        id: "cloud",
        label: "Global Infrastructure",
        tech: "AWS • Cloudflare • VPC",
        shortTech: "AWS, Cloudflare, VPC",
        desc: "Multi-region cloud infrastructure utilizing automated auto-scaling and edge CDN caching.",
        icon: "☁️",
        angle: -Math.PI / 6,
        color: "from-purple-400 to-indigo-500",
        shadow: "shadow-[0_0_30px_rgba(168,85,247,0.25)]",
        glowColor: "rgba(168,85,247,0.2)",
        status: "Optimal",
        iconComponent: Cloud
    },
    {
        id: "ai",
        label: "Intelligence Engine",
        tech: "OpenAI • PyTorch • LangChain",
        shortTech: "OpenAI, PyTorch, LangChain",
        desc: "Enterprise LLM orchestrations and real-time custom machine learning pipelines.",
        icon: "🧠",
        angle: Math.PI / 6,
        color: "from-emerald-400 to-teal-500",
        shadow: "shadow-[0_0_30px_rgba(52,211,153,0.25)]",
        glowColor: "rgba(52,211,153,0.2)",
        status: "Ready",
        iconComponent: Brain
    },
    {
        id: "security",
        label: "Protection Layer",
        tech: "Zero-Trust • SSL • OAuth2",
        shortTech: "Zero-Trust, SSL, OAuth2",
        desc: "Secure end-to-end data encryption at rest and transit with active threat prevention.",
        icon: "🛡️",
        angle: Math.PI / 2,
        color: "from-rose-400 to-red-500",
        shadow: "shadow-[0_0_30px_rgba(251,113,133,0.25)]",
        glowColor: "rgba(251,113,133,0.2)",
        status: "Secure",
        iconComponent: Shield
    },
    {
        id: "devops",
        label: "Deployment Pipeline",
        tech: "GitHub Actions • Docker • K8s",
        shortTech: "GitHub Actions, Docker, K8s",
        desc: "Immutable release pipelines with regression tests and automated rollbacks.",
        icon: "⚙️",
        angle: 5 * Math.PI / 6,
        color: "from-amber-400 to-orange-500",
        shadow: "shadow-[0_0_30px_rgba(251,191,36,0.25)]",
        glowColor: "rgba(251,191,36,0.2)",
        status: "Synced",
        iconComponent: Cpu
    },
    {
        id: "backend",
        label: "Business Logic Layer",
        tech: "Node.js • Go • PostgreSQL",
        shortTech: "Node.js, Go, PostgreSQL",
        desc: "Asynchronous microservices coordination and high-speed core API endpoints.",
        icon: "⚙️",
        angle: 7 * Math.PI / 6,
        color: "from-blue-400 to-indigo-500",
        shadow: "shadow-[0_0_30px_rgba(96,165,250,0.25)]",
        glowColor: "rgba(96,165,250,0.2)",
        status: "Active",
        iconComponent: Server
    }
];

// OrbitingNode component with hover tooltips, status indicators and gentle floating animation
function DesktopOrbitingNode({ node, radius, index }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            className="absolute z-20"
            style={{
                left: `calc(50% + ${Math.cos(node.angle) * radius}px)`,
                top: `calc(50% + ${Math.sin(node.angle) * radius}px)`,
                transform: 'translate(-50%, -50%)'
            }}
            animate={{
                y: [0, -4, 0],
                x: [0, 3, 0]
            }}
            transition={{
                y: { duration: 4 + index * 0.5, repeat: Infinity, ease: "easeInOut" },
                x: { duration: 5 + index * 0.4, repeat: Infinity, ease: "easeInOut" }
            }}
        >
            <div
                className="relative flex flex-col items-center cursor-pointer group"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Node Container */}
                <motion.div
                    whileHover={{ scale: 1.12 }}
                    className={`w-12 h-12 lg:w-14 lg:h-14 rounded-2xl bg-white/70 dark:bg-slate-900/70 border border-slate-200 dark:border-white/10 backdrop-blur-md flex items-center justify-center text-xl lg:text-2xl ${node.shadow} transition-all duration-300 group-hover:border-indigo-400`}
                >
                    {node.icon}

                    {/* Blinking Status Indicator */}
                    <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border border-white dark:border-slate-950 flex items-center justify-center">
                        <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping" />
                    </span>
                </motion.div>

                {/* Fixed Label Below Node */}
                <span className="text-[9px] lg:text-xs font-semibold text-slate-800 dark:text-gray-200 text-center max-w-[95px] leading-tight select-none mt-2 transition-colors group-hover:text-indigo-500 dark:group-hover:text-indigo-400">
                    {node.label}
                </span>

                {/* Premium Floating Tooltip */}
                <AnimatePresence>
                    {isHovered && (
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            transition={{ duration: 0.18, ease: "easeOut" }}
                            className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 z-[9999] w-64 p-4 rounded-xl bg-white/95 dark:bg-slate-950/95 border border-slate-200 dark:border-white/10 backdrop-blur-xl shadow-xl text-left pointer-events-none"
                        >
                            <div className="absolute inset-x-0 bottom-[-6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-white dark:bg-slate-950 border-r border-b border-slate-200 dark:border-white/10 rotate-45" />
                            <h4 className="font-bold text-xs text-slate-900 dark:text-white flex items-center gap-1.5">
                                <span className="text-xs">{node.icon}</span>
                                {node.label}
                            </h4>
                            <div className="text-[10px] text-indigo-600 dark:text-indigo-400 font-semibold mt-1 mb-1.5">
                                {node.tech}
                            </div>
                            <p className="text-[10px] text-slate-500 dark:text-gray-400 leading-relaxed">
                                {node.desc}
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
}

// SVG Flow line animation placeholder

export default function TechArchitecture() {
    const [radius, setRadius] = useState(180);
    const [isCenterHovered, setIsCenterHovered] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 640) setRadius(80);
            else if (window.innerWidth < 1024) setRadius(140);
            else setRadius(190);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <section className="font-manrope relative w-full py-[clamp(2.5rem,6vw,6rem)] bg-slate-50/50 dark:bg-background transition-colors duration-300 px-4 sm:px-6 lg:px-12 overflow-hidden">
            {/* Soft decorative background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/5 dark:bg-indigo-500/[0.02] rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

                {/* Left Side: Content & Technology Cards */}
                <div className="w-full lg:w-[60%] text-center lg:text-left">
                    <span className="text-indigo-600 dark:text-indigo-400 font-mono text-xs uppercase tracking-widest font-bold">System Topology</span>
                    <h2 className="text-[1.8rem] md:text-[2.5rem] lg:text-[3rem] font-[600] tracking-[-0.03em] text-foreground mt-3 mb-4 leading-[1.05]">
                        Technology <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-blue-400 dark:to-indigo-500">Ecosystem</span>
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400 font-normal leading-relaxed text-sm md:text-base max-w-2xl mx-auto lg:mx-0">
                        Our platform architecture leverages best-in-class technologies connected through highly optimized, secure data routes. Check out the layers powering our workflow.
                    </p>

                    <div className="hidden lg:grid grid-cols-2 xl:grid-cols-3 gap-5 mt-8 lg:mt-12">
                        {architectureNodes.map((node) => {
                            return (
                                <motion.div
                                    key={node.id}
                                    whileHover={{ y: -5, boxShadow: "0 12px 24px -10px rgba(99,102,241,0.15)" }}
                                    className="p-5 lg:p-6 rounded-2xl bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-white/[0.06] backdrop-blur-md text-left transition-all duration-300 flex flex-col gap-3.5 hover:border-indigo-400/50 hover:bg-white dark:hover:bg-slate-900/80 group"
                                >
                                    <div className="flex items-center gap-3.5">
                                        <div className="w-12 h-12 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-white/5 flex items-center justify-center text-2xl shadow-sm group-hover:scale-105 transition-transform duration-300 shrink-0">
                                            {node.icon}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-sm lg:text-[1.05rem] text-slate-900 dark:text-white leading-tight">
                                                {node.label}
                                            </h4>
                                            <span className="text-[10px] lg:text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wide mt-1 block">
                                                {node.shortTech}
                                            </span>
                                        </div>
                                    </div>
                                    <p className="text-xs lg:text-[14px] text-slate-600 dark:text-gray-300 leading-relaxed mt-1">
                                        {node.desc}
                                    </p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {/* Right Side: Interactive Circular Diagram (Desktop >= 1024px) */}
                <div className="hidden lg:block relative lg:w-[40%] h-[550px] flex-shrink-0">

                    {/* Concentric Architecture Rings */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-slate-200 dark:border-white/[0.03] rounded-full pointer-events-none" style={{ width: radius * 2, height: radius * 2 }} />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-slate-200 dark:border-white/[0.05] rounded-full pointer-events-none" style={{ width: radius * 1.25, height: radius * 1.25 }} />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-slate-200 dark:border-white/[0.07] rounded-full border-dashed pointer-events-none animate-spin" style={{ width: radius * 2.3, height: radius * 2.3, animationDuration: '40s' }} />

                    {/* CSS styles for SVG dashed animation */}
                    <style dangerouslySetInnerHTML={{__html: `
                        @keyframes flowDash {
                            to {
                                stroke-dashoffset: -24;
                            }
                        }
                        .animate-flow-dash {
                            animation: flowDash 1.2s linear infinite;
                        }
                    `}} />

                    {/* Flowing Data Lines with CSS-animated SVG dashed paths */}
                    <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none overflow-visible z-10" style={{ width: radius * 2, height: radius * 2 }}>
                        <defs>
                            <linearGradient id="line-glow" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="rgba(99, 102, 241, 0.4)" />
                                <stop offset="50%" stopColor="rgba(34, 211, 238, 0.3)" />
                                <stop offset="100%" stopColor="rgba(99, 102, 241, 0)" />
                            </linearGradient>
                        </defs>
                        {architectureNodes.map((node, idx) => {
                            const x2 = radius + Math.cos(node.angle) * radius;
                            const y2 = radius + Math.sin(node.angle) * radius;
                            return (
                                <line
                                    key={`line-${idx}`}
                                    x1={radius}
                                    y1={radius}
                                    x2={x2}
                                    y2={y2}
                                    stroke="url(#line-glow)"
                                    strokeWidth="1.5"
                                    strokeDasharray="4 8"
                                    className="animate-flow-dash"
                                />
                            );
                        })}
                    </svg>

                    {/* Orbiting Nodes */}
                    {architectureNodes.map((node, idx) => (
                        <DesktopOrbitingNode key={idx} node={node} radius={radius} index={idx} />
                    ))}

                    {/* Interactive Central Orchestration Core Platform */}
                    <div
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30"
                        onMouseEnter={() => setIsCenterHovered(true)}
                        onMouseLeave={() => setIsCenterHovered(false)}
                    >
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="relative cursor-pointer w-28 h-28 lg:w-36 lg:h-36 rounded-full bg-slate-50 dark:bg-slate-950 border-2 border-indigo-500/40 dark:border-indigo-500/50 flex flex-col items-center justify-center p-3 shadow-[0_0_35px_rgba(99,102,241,0.15)] dark:shadow-[0_0_55px_rgba(99,102,241,0.3)] transition-colors"
                        >
                            <div className="absolute inset-0 rounded-full bg-indigo-500/10 animate-ping" style={{ animationDuration: '3.5s' }} />
                            <span className="text-xl lg:text-2xl mb-1 filter drop-shadow-[0_0_8px_rgba(99,102,241,0.4)]">⚡</span>
                            <span className="text-slate-900 dark:text-white font-extrabold text-[10px] lg:text-xs tracking-tight text-center leading-none">
                                Core Platform
                            </span>
                            <span className="text-indigo-600 dark:text-indigo-400 font-bold text-[8px] lg:text-[9px] mt-1 tracking-wider uppercase text-center leading-none">
                                Orchestration Layer
                            </span>
                        </motion.div>

                        {/* Center Hover Card description tooltip */}
                        <AnimatePresence>
                            {isCenterHovered && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                    transition={{ duration: 0.18 }}
                                    className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 z-50 w-72 p-4 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-white/10 backdrop-blur-xl shadow-2xl text-center pointer-events-none"
                                >
                                    <div className="absolute inset-x-0 bottom-[-6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-white dark:bg-slate-950 border-r border-b border-slate-200 dark:border-white/10 rotate-45" />
                                    <h4 className="font-bold text-xs text-slate-900 dark:text-white mb-1">
                                        ⚡ Core Platform Central Gateway
                                    </h4>
                                    <p className="text-[10px] text-slate-500 dark:text-gray-400 leading-relaxed">
                                        Routes data securely between Frontend, Cloud Infrastructure, AI Models, Security Systems, Backend Services, and DevOps Pipelines.
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Tablet (768-1024px) & Mobile (<768px) Dashboard Layout */}
                <motion.div
                    className="block lg:hidden w-full max-w-[900px] mx-auto flex flex-col gap-5 sm:gap-6 px-2 mt-4 text-left"
                >
                    {/* Primary Highlighted Core Platform Card for Mobile */}
                    <div
                        className="relative z-10 w-full p-6 rounded-2xl bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950 border border-indigo-200 dark:border-indigo-500/30 shadow-premium flex flex-col gap-3.5 backdrop-blur-md transition-all duration-300"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />
                        <div className="flex items-center justify-between w-full">
                            <div className="flex items-center gap-3.5">
                                <div className="w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/30 flex items-center justify-center shadow-md">
                                    <Zap className="w-6 h-6 text-yellow-500 dark:text-yellow-400 filter drop-shadow-[0_0_5px_rgba(250,204,21,0.2)] animate-pulse" />
                                </div>
                                <div>
                                    <h3 className="text-base font-bold text-slate-900 dark:text-white tracking-tight leading-tight">Core Platform</h3>
                                    <p className="text-[10px] text-indigo-600 dark:text-indigo-400 font-bold tracking-wider uppercase mt-0.5">Central Engine</p>
                                </div>
                            </div>
                            <span className="px-2.5 py-1 rounded-full text-[9px] font-bold tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-100 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20 uppercase">
                                Active
                            </span>
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                            Routes data securely between Frontend, Cloud Infrastructure, AI Models, Security Systems, Backend Services, and DevOps Pipelines.
                        </p>
                    </div>

                    <div className="relative md:pl-0 pl-7 flex flex-col gap-4">
                        <div className="md:hidden absolute left-[13px] top-0 bottom-10 w-[2px] bg-gradient-to-b from-indigo-500/50 via-cyan-500/30 to-slate-800/10 pointer-events-none">
                            <motion.div className="absolute w-[2px] h-20 bg-gradient-to-b from-indigo-500 via-cyan-400 to-transparent shadow-[0_0_8px_rgba(34,211,238,0.7)]" animate={{ top: ["0%", "100%"] }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }} />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 mt-2">
                            {architectureNodes.map((node) => (
                                <div key={node.id} className="relative w-full p-5 md:p-6 h-full rounded-2xl bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-white/[0.06] flex items-start gap-4 backdrop-blur-md transition-all duration-300 hover:shadow-lg dark:hover:border-indigo-500/30 group">
                                    <div className="md:hidden absolute -left-[15px] top-[32px] w-[15px] h-[2px] bg-gradient-to-r from-indigo-500/20 to-transparent" />
                                    <div className="w-11 h-11 md:w-14 md:h-14 rounded-xl flex items-center justify-center shrink-0 border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-2xl md:text-3xl shadow-sm group-hover:scale-110 transition-transform">
                                        {node.icon}
                                    </div>
                                    <div className="flex flex-col gap-1.5 w-full text-left">
                                        <div className="flex items-center justify-between gap-2">
                                            <h4 className="text-[15px] sm:text-base font-bold text-slate-900 dark:text-white tracking-tight">{node.label}</h4>
                                            <span className="px-2 py-1 rounded-md text-[9px] font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/35 uppercase tracking-wide">
                                                {node.status}
                                            </span>
                                        </div>
                                        <p className="text-xs text-indigo-600 dark:text-indigo-400 font-bold leading-none">{node.tech}</p>
                                        <p className="text-sm text-slate-600 dark:text-gray-300 leading-relaxed mt-1 line-clamp-3 md:line-clamp-2">
                                            {node.desc}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
