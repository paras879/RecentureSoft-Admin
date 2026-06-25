"use client";
import { useProjectModal } from "@/components/providers/ProjectModalProvider";
import { useMeetingModal } from "@/components/providers/MeetingModalProvider";

export default function CTASection({ title = "Ready to build something extraordinary?", description = "Let's turn your vision into reality. Partner with us to engineer digital experiences that scale.", primaryBtnText = "Start a Project", secondaryBtnText = "Schedule a Call" }) {
    const { openModal } = useProjectModal();
    const { openMeetingModal } = useMeetingModal();
    return (
        <section className="relative pt-2 pb-4 md:pt-4 md:pb-6 lg:pt-6 lg:pb-8 overflow-hidden bg-background flex items-center justify-center transition-colors duration-300">
            {/* Background Elements (Static for optimal scroll performance) */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-20 dark:opacity-50">
                <div className="absolute top-[10%] left-[15%] w-72 h-72 bg-blue-600/20 dark:bg-blue-600/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-[10%] right-[15%] w-96 h-96 bg-purple-600/20 dark:bg-purple-600/10 rounded-full blur-[120px]" />
            </div>

            <div className="container mx-auto px-6 relative z-10 max-w-7xl">
                <div className="bg-slate-100/50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 rounded-[2.5rem] p-5 md:p-10 lg:p-16 text-center backdrop-blur-2xl relative overflow-hidden group shadow-premium transition-all duration-300">
                    {/* Hover Glow Effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none bg-[radial-gradient(ellipse_at_center,_rgba(6,182,212,0.15),_transparent_60%)] dark:bg-[radial-gradient(ellipse_at_center,_rgba(6,182,212,0.08),_transparent_60%)]" />

                    <h2
                        className="text-[clamp(1.8rem,4.5vw,3.5rem)] font-extrabold text-foreground tracking-tight leading-tight mb-3 md:mb-4"
                    >
                        {title}
                    </h2>

                    <p
                        className="max-w-2xl mx-auto text-slate-600 dark:text-gray-400 text-[clamp(0.9rem,1.5vw,1.1rem)] leading-relaxed mb-6 md:mb-8"
                    >
                        {description}
                    </p>

                    <div
                        className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
                    >
                        <button 
                            onClick={openModal}
                            className="w-full sm:w-auto px-8 py-4 bg-primary text-white font-semibold rounded-full hover:bg-cyan-600 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(6,182,212,0.2)] dark:shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                        >
                            {primaryBtnText}
                        </button>
                        <button 
                            onClick={openMeetingModal}
                            className="w-full sm:w-auto px-8 py-4 bg-slate-200/50 dark:bg-white/[0.05] text-slate-800 dark:text-white border border-slate-300 dark:border-white/10 font-semibold rounded-full hover:bg-slate-300/50 dark:hover:bg-white/[0.1] transition-all duration-300 transform hover:scale-105 active:scale-95"
                        >
                            {secondaryBtnText}
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
