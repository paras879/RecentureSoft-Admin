import Image from "next/image";
import Link from "next/link";

export default function FeaturedArticle({ article }) {
    if (!article) return null;

    const formatDate = (dateString) => {
        if (!dateString) return "";
        return new Date(dateString).toLocaleDateString("en-US", {
            timeZone: 'Asia/Kolkata',
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    return (
        <section className="pt-8 pb-8 lg:pt-12 lg:pb-12 bg-slate-50 dark:bg-[#020617] transition-colors duration-300">
            <div className="container mx-auto px-4 max-w-[1200px]">
                <div className="flex justify-between items-end mb-12">
                    <h2 className="text-[clamp(2rem,3vw,3rem)] font-extrabold text-slate-900 dark:text-white">Featured Insight</h2>
                </div>

                <style dangerouslySetInnerHTML={{__html: `
                    @keyframes faFadeIn {
                        from { opacity: 0; transform: translateY(20px); }
                        to { opacity: 1; transform: translateY(0); }
                    }
                    .fa-fade-in {
                        animation: faFadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                        opacity: 0;
                    }
                `}} />

                <Link href={`/blog/${article.slug}`} className="block">
                    <div 
                        className="fa-fade-in relative h-[500px] lg:h-[600px] rounded-[2.5rem] overflow-hidden group cursor-pointer border border-white/10"
                    >
                        <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/80 to-transparent z-10" />
                        <div className="absolute inset-0 z-0 h-full w-full overflow-hidden">
                            <Image 
                                src={article.image} 
                                alt={article.title || 'Featured Article'} 
                                fill
                                priority
                                unoptimized={true}
                                className="object-cover transform group-hover:scale-105 transition-transform duration-1000" 
                            />
                        </div>
                        
                        <div className="absolute inset-0 z-20 flex flex-col justify-end p-8 lg:p-16">
                            <div className="max-w-3xl">
                                <div className="flex items-center gap-4 mb-6">
                                    <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-wider rounded-full border border-cyan-500/30">
                                        {article.category}
                                    </span>
                                    <span className="text-gray-400 text-sm">{formatDate(article.createdAt)}</span>
                                 </div>
                                <h3 className="text-[clamp(2rem,4vw,3.5rem)] font-bold text-white leading-tight mb-6 group-hover:text-cyan-300 transition-colors duration-300">
                                    {article.title}
                                </h3>
                                <p className="text-gray-300 text-lg lg:text-xl font-light mb-8 max-w-2xl line-clamp-2">
                                    {article.excerpt}
                                </p>

                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        </section>
    );
}
