/* Color tokens — must match StatsDashboard.jsx */
const C = {
  primary:   "#06E6FF",
  secondary: "#3B82F6",
  accent:    "#8B5CF6",
  gradient:  "linear-gradient(135deg, #06E6FF, #3B82F6, #8B5CF6)",
};

/**
 * KPIWidget – glassmorphism mini-card with CSS hover-scale,
 * static gradient border, neon edge glow, and floating CSS motion.
 * Uses unified cyan → blue → violet palette.
 */
export default function KPIWidget({ label, value, color, trend = "up", icon, index = 0 }) {
  const arrow = trend === "up" ? (
    <svg viewBox="0 0 20 20" fill={color} className="w-3 h-3 ml-1 opacity-70">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
    </svg>
  ) : (
    <svg viewBox="0 0 20 20" fill={color} className="w-3 h-3 ml-1 opacity-70">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
    </svg>
  );

  return (
    <div
      className="group relative rounded-2xl cursor-pointer overflow-hidden animate-neonEdge hover:-translate-y-1.5 hover:scale-[1.03] transition-all duration-300"
    >
      {/* CSS float style */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes floatWidget {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        .float-widget {
          animation: floatWidget var(--duration) ease-in-out infinite;
        }
      `}} />

      {/* Static premium gradient border */}
      <div
        className="absolute inset-0 rounded-2xl"
        style={{
          padding: "1px",
          background: `linear-gradient(135deg, ${C.primary}20, transparent 40%, ${C.secondary}15, transparent 80%, ${C.accent}10)`,
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />

      {/* Card body */}
      <div className="relative rounded-2xl bg-slate-50/50 dark:bg-white/[0.025] backdrop-blur-xl p-4 h-full">
        {/* Floating motion via CSS */}
        <div
          className="float-widget"
          style={{ "--duration": `${4.5 + index}s` }}
        >
          {/* Icon + label */}
          <div className="flex items-center gap-2 mb-2">
            {icon && <span className="text-sm">{icon}</span>}
            <p className="text-[10px] text-slate-500 dark:text-gray-500 uppercase tracking-[0.15em] font-semibold">
              {label}
            </p>
          </div>

          {/* Value */}
          <div className="flex items-center">
            <span className="text-lg font-bold text-slate-900 dark:text-white">
              {value}
            </span>
            {arrow}
          </div>
        </div>

        {/* Subtle hover glow — matches card's accent color */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${color}08, transparent 70%)`,
          }}
        />
      </div>
    </div>
  );
}
