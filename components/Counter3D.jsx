"use client";


import { motion } from "framer-motion";
import CountUp from "react-countup";

/* Color tokens — must match StatsDashboard.jsx */
const C = {
  primary: "#06E6FF",
  secondary: "#3B82F6",
  accent: "#8B5CF6",
  gradient: "linear-gradient(45deg, #06E6FF, #3B82F6, #8B5CF6)",
};

/**
 * Counter3D – glassmorphism card with animated counter,
 * floating icon, 3D tilt, and unified color palette.
 */
export default function Counter3D({ icon, value, suffix = "", label }) {
  return (
    <div
      className="relative group rounded-2xl bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 p-6 text-center cursor-pointer overflow-hidden shadow-sm dark:shadow-none transition-transform duration-300 hover:scale-[1.04]"
    >
      {/* Border */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{ border: `1px solid ${C.primary}15` }}
      />

      {/* Icon with floating animation */}
      <motion.div
        className="mb-4"
        animate={{ y: [0, -5, 0] }}
        transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
      >
        {icon}
      </motion.div>

      {/* Counter value — bright white */}
      <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-1">
        <CountUp start={0} end={value} duration={2} separator="," />{suffix}
      </h3>

      {/* Label — gray secondary text */}
      <p className="text-sm text-slate-600 dark:text-gray-500 uppercase tracking-wider">{label}</p>

      {/* Hover glow — unified primary color */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400"
        style={{
          background: `radial-gradient(circle at center, ${C.primary}08, transparent 70%)`,
        }}
      />
    </div>
  );
}
