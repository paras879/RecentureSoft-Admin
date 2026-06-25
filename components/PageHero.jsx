export default function PageHero({ title, highlight, description, children }) {
    return (
        <section className="relative pt-24 md:pt-28 lg:pt-32 pb-2 md:pb-4 lg:pb-6 overflow-hidden bg-background min-h-fit flex items-center transition-colors duration-300">
            {/* CSS entry animations */}
            <style dangerouslySetInnerHTML={{__html: `
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes scaleXIn {
                    from { opacity: 0; transform: scaleX(0); }
                    to { opacity: 1; transform: scaleX(1); }
                }
                @keyframes scaleIn {
                    from { opacity: 0; transform: scale(0.95); }
                    to { opacity: 1; transform: scale(1); }
                }
                .animate-fade-up-1 {
                    animation: fadeInUp 0.6s ease-out 0.1s both;
                }
                .animate-fade-up-2 {
                    animation: fadeInUp 0.6s ease-out 0.2s both;
                }
                .animate-scale-x-in {
                    animation: scaleXIn 0.8s ease-out 0.4s both;
                }
                .animate-scale-in {
                    animation: scaleIn 0.8s ease-out 0.3s both;
                }
            `}} />
            
            {/* Background elements */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-40 dark:mix-blend-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/20 dark:from-blue-900/20 via-background to-background" />
            <div className="absolute -left-[20%] top-[20%] w-[50%] h-[50%] bg-blue-500/10 dark:bg-blue-900/10 rounded-full blur-[120px] pointer-events-none z-0" />
            <div className="absolute -right-[20%] bottom-[10%] w-[50%] h-[50%] bg-purple-500/10 dark:bg-purple-900/10 rounded-full blur-[120px] pointer-events-none z-0" />

            <div className="container mx-auto px-5 sm:px-8 lg:px-12 xl:px-16 relative z-20 max-w-[1500px]">
                <div className={`grid gap-6 md:gap-8 lg:gap-12 items-center ${children ? 'grid-cols-1 xl:grid-cols-2' : 'grid-cols-1'}`}>

                    {/* Content Left (or centered when no children) */}
                    <div className={`flex flex-col justify-center order-1 ${children ? 'lg:order-1 text-center lg:text-left' : 'text-center items-center'}`}>

                        <h1
                            className={`font-bold tracking-[-0.02em] leading-[1] text-foreground mb-4 md:mb-6 animate-fade-up-1 ${children ? 'text-[2.25rem] sm:text-[3rem] md:text-[4rem] lg:text-[5rem]' : 'text-[2.5rem] sm:text-[3.5rem] md:text-[4.5rem] lg:text-[5.5rem]'}`}
                        >
                            {title} <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-500 to-indigo-500">{highlight}</span>
                        </h1>

                        <p
                            className={`text-slate-600 dark:text-slate-300 text-base md:text-lg lg:text-xl font-normal leading-8 animate-fade-up-2 ${children ? 'max-w-2xl mx-auto lg:mx-0' : 'max-w-3xl mx-auto'}`}
                        >
                            {description}
                        </p>

                        {/* Decorative accent when no 3D scene */}
                        {!children && (
                            <div
                                className="mt-8 flex items-center justify-center gap-3 animate-scale-x-in"
                            >
                                <div className="h-[2px] w-16 bg-gradient-to-r from-transparent via-blue-500/50 to-cyan-500/50 rounded-full" />
                                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
                                <div className="h-[2px] w-16 bg-gradient-to-l from-transparent via-indigo-500/50 to-purple-500/50 rounded-full" />
                            </div>
                        )}
                    </div>

                    {/* 3D Visual Right — only when children provided */}
                    {children && (
                        <div
                            className="order-2 lg:order-2 h-[180px] sm:h-[240px] md:h-[320px] lg:h-[420px] w-full relative flex items-center justify-center animate-scale-in"
                        >
                            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 to-purple-500/5 rounded-full blur-3xl -z-10" />
                            {children}
                        </div>
                    )}

                </div>
            </div>

            {/* Bottom Gradient Fade to merge with next section */}
            <div className="absolute bottom-0 inset-x-0 h-12 md:h-16 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none" />
        </section>
    );
}
