/* Color token — must match StatsDashboard.jsx */
const PRIMARY = "#06E6FF";

/**
 * LiveStatusBar – subtle animated "Live Data Streaming" indicator.
 * Uses unified primary cyan.
 */
export default function LiveStatusBar() {
  return (
    <div
      className="flex items-center justify-center py-2 text-sm bg-slate-50 dark:bg-[#080c14] border-t border-slate-200 dark:border-[#06E6FF18] transition-colors duration-300 animate-pulse-text"
      style={{
        color: `${PRIMARY}cc`,
      }}
    >
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes pulseText {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 1; }
        }
        @keyframes pulseDot {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
        .animate-pulse-text {
          animation: pulseText 2.5s ease-in-out infinite;
        }
        .animate-pulse-dot {
          animation: pulseDot 1.5s ease-in-out infinite;
        }
      `}} />
      <span>Live Data Streaming</span>
      <span
        className="ml-2 w-2 h-2 rounded-full animate-pulse-dot"
        style={{ background: PRIMARY }}
      />
    </div>
  );
}
