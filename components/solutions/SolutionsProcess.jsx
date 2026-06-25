const PROCESS_STEPS = [
    { num: "01", title: "Requirement & Strategy", desc: "We understand your business needs and create a roadmap for digital transformation." },
    { num: "02", title: "UI/UX Design", desc: "Crafting intuitive and engaging interfaces tailored for your web and mobile applications." },
    { num: "03", title: "Development & AI", desc: "Building scalable enterprise software and integrating cutting-edge AI solutions." },
    { num: "04", title: "Testing & Launch", desc: "Rigorous QA testing followed by seamless deployment and ongoing technical support." }
];

    export default function SolutionsProcess() {
        return (
        <section className="font-manrope relative w-full py-8 md:py-12 bg-slate-50 dark:bg-[#020617] px-4 lg:px-8 overflow-hidden transition-colors duration-300">
            <div className="max-w-[800px] mx-auto flex flex-col gap-4 md:gap-6">

                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="max-w-2xl">

                        <h2 className="text-2xl md:text-3xl font-[600] tracking-[-0.03em] text-slate-900 dark:text-white mb-2 leading-tight">
                            How We <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600 dark:from-cyan-400 dark:to-blue-500">Deliver</span>
                        </h2>
                        <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 font-[400] leading-relaxed max-w-lg">
                            A proven process for building scalable web platforms, mobile apps, and AI solutions.
                        </p>
                    </div>
                </div>

                <div className="relative w-full mt-4">
                    {/* Background Connecting Line */}
                    <div className="absolute left-5 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-slate-300 dark:via-white/10 to-transparent md:-translate-x-1/2 transition-colors duration-300" />

                    <div className="flex flex-col gap-4 md:gap-6 lg:gap-8">
                        {PROCESS_STEPS.map((step, idx) => {
                            const isEven = idx % 2 === 0;
                            return (
                                <div key={idx} className="relative w-full flex flex-col md:flex-row items-center justify-between group">
                                    
                                    {/* Mobile Only Line */}
                                    <div className="md:hidden absolute left-[38px] top-1/2 w-8 h-[2px] bg-slate-200 dark:bg-white/10 -translate-y-1/2 z-0" />

                                    {/* Left Side (Desktop) */}
                                    <div className={`hidden md:flex w-[45%] justify-end relative ${!isEven ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                                        {!isEven && (
                                            <>
                                                {/* Connecting Line */}
                                                <div className="absolute top-1/2 -translate-y-1/2 -right-[11%] w-[11%] h-[2px] bg-slate-200 dark:bg-white/10 group-hover:bg-cyan-500/50 transition-colors duration-500" />
                                                
                                                {/* Card */}
                                                <div className="w-full xl:w-[90%] bg-white dark:bg-[#0f172a] border border-slate-200/80 dark:border-white/5 rounded-xl p-4 lg:p-5 shadow-sm hover:shadow-md dark:shadow-none transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/40 relative z-10 text-right">
                                                    <h3 className="text-lg lg:text-xl font-bold text-slate-900 dark:text-white mb-1 tracking-tight group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">{step.title}</h3>
                                                    <p className="text-slate-500 dark:text-slate-400 leading-snug text-xs lg:text-sm font-medium">{step.desc}</p>
                                                </div>
                                            </>
                                        )}
                                    </div>

                                    {/* Center Node */}
                                    <div className="absolute left-5 md:left-1/2 transform -translate-x-1/2 w-8 h-8 md:w-10 md:h-10 rounded-full bg-slate-50 dark:bg-[#020617] border-2 border-slate-200 dark:border-white/10 flex items-center justify-center z-20 group-hover:border-cyan-500 group-hover:bg-cyan-50 dark:group-hover:bg-cyan-500/10 transition-all duration-500 shadow-sm">
                                        <span className="text-slate-400 dark:text-slate-500 text-xs md:text-sm font-bold font-mono group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">{step.num}</span>
                                    </div>

                                    {/* Right Side (Desktop) & Full Width (Mobile) */}
                                    <div className={`w-full pl-14 md:pl-0 md:w-[45%] flex justify-start relative ${isEven ? 'opacity-100' : 'md:opacity-0 md:pointer-events-none'}`}>
                                        {(isEven || true) && ( // On mobile we always render this block, but CSS hides it on desktop if !isEven
                                            <div className={`${!isEven ? 'md:hidden' : ''} w-full xl:w-[90%] relative`}>
                                                
                                                {/* Connecting Line */}
                                                <div className="hidden md:block absolute top-1/2 -translate-y-1/2 -left-[11%] w-[11%] h-[2px] bg-slate-200 dark:bg-white/10 group-hover:bg-cyan-500/50 transition-colors duration-500" />
                                                
                                                {/* Card */}
                                                <div className="w-full bg-white dark:bg-[#0f172a] border border-slate-200/80 dark:border-white/5 rounded-xl p-4 lg:p-5 shadow-sm hover:shadow-md dark:shadow-none transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/40 relative z-10 text-left">
                                                    <h3 className="text-lg lg:text-xl font-bold text-slate-900 dark:text-white mb-1 tracking-tight group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">{step.title}</h3>
                                                    <p className="text-slate-500 dark:text-slate-400 leading-snug text-xs lg:text-sm font-medium">{step.desc}</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                </div>
                            );
                        })}
                    </div>
                </div>

            </div>
        </section>
    );
}
