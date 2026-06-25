"use client";

/**
 * AIAvatar - A high-performance, GPU-accelerated CSS morphing orb.
 * Replaces the Three.js canvas with an organic liquid blob effect
 * using CSS border-radius keyframes and animated gradients.
 */
export default function AIAvatar({ isThinking = false }) {
    return (
        <div className="w-16 h-16 shrink-0 relative flex items-center justify-center select-none pointer-events-none">
            {/* Outer soft glow ring */}
            <div
                className={`absolute inset-0 rounded-full blur-md opacity-45 transition-all duration-700
                    ${isThinking 
                        ? "bg-purple-500 scale-110 animate-pulse" 
                        : "bg-cyan-500 scale-100"}`}
                style={{ animationDuration: isThinking ? "1.5s" : "3s" }}
            />

            {/* Inner rotating/morphing liquid blob */}
            <div
                className={`w-12 h-12 rounded-full relative overflow-hidden transition-all duration-700
                    bg-gradient-to-tr ${isThinking ? "from-purple-600 via-pink-500 to-indigo-600" : "from-cyan-500 via-blue-500 to-indigo-500"}
                    animate-blob-morph`}
                style={{
                    animationDuration: isThinking ? "4s" : "8s",
                    boxShadow: isThinking 
                        ? "0 0 20px rgba(168,85,247,0.6), inset 0 0 12px rgba(255,255,255,0.2)"
                        : "0 0 15px rgba(6,182,212,0.4), inset 0 0 10px rgba(255,255,255,0.2)"
                }}
            >
                {/* Secondary inner highlights for depth */}
                <div 
                    className="absolute inset-1 rounded-full bg-gradient-to-bl from-white/20 via-transparent to-transparent opacity-60 mix-blend-overlay"
                />
            </div>

            {/* Wireframe outer ring */}
            <div
                className={`absolute inset-0.5 rounded-full border border-dashed transition-all duration-700
                    ${isThinking 
                        ? "border-purple-400/40 animate-spin-fast" 
                        : "border-cyan-400/30 animate-spin-slow"}`}
            />

            {/* Embed animations directly for extreme encapsulation and efficiency */}
            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes blob-morph {
                    0%, 100% {
                        border-radius: 42% 58% 70% 30% / 45% 45% 55% 55%;
                        transform: rotate(0deg);
                    }
                    34% {
                        border-radius: 70% 30% 52% 48% / 60% 40% 60% 40%;
                    }
                    67% {
                        border-radius: 50% 50% 30% 70% / 40% 60% 30% 70%;
                    }
                }
                .animate-blob-morph {
                    animation: blob-morph infinite linear;
                    will-change: border-radius, transform;
                }
                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                @keyframes spin-fast {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(-360deg); }
                }
                .animate-spin-slow {
                    animation: spin-slow 20s linear infinite;
                }
                .animate-spin-fast {
                    animation: spin-fast 6s linear infinite;
                }
            `}} />
        </div>
    );
}
