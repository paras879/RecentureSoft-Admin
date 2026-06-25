"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function EventMasonryGrid({ images, isLoading, onSelectImage }) {
    if (isLoading) {
        // Render premium uniform loading skeletons
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {Array.from({ length: 8 }).map((_, idx) => (
                    <div
                        key={idx}
                        className="w-full aspect-[4/3] bg-slate-200/50 dark:bg-slate-800/20 animate-pulse rounded-[24px] border border-slate-100 dark:border-white/[0.02]"
                    />
                ))}
            </div>
        );
    }

    if (!images || images.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center mb-6 text-3xl">
                    📷
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    No Images Found
                </h3>
                <p className="text-slate-500 dark:text-slate-400 max-w-sm mt-2 text-sm leading-relaxed">
                    There are no gallery photos uploaded for this year yet. Check back soon for updates!
                </p>
            </div>
        );
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.04
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        show: { 
            opacity: 1, 
            y: 0, 
            transition: { 
                type: "spring", 
                stiffness: 100, 
                damping: 18 
            } 
        }
    };

    return (
        <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
            {images.map((img, index) => (
                <motion.div
                    key={img._id || index}
                    variants={itemVariants}
                    onClick={() => onSelectImage(index)}
                    className="relative w-full aspect-[4/3] group overflow-hidden rounded-[24px] cursor-pointer bg-slate-100 dark:bg-slate-950 border border-slate-200/60 dark:border-white/5 shadow-md hover:shadow-2xl hover:border-cyan-500/20 dark:hover:border-cyan-400/20 transition-all duration-500"
                >
                    <Image
                        src={img.image}
                        alt={img.title || `Gallery image ${index + 1}`}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover w-full h-auto transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                        loading="lazy"
                    />
                    
                    {/* Dark Gradient Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6 select-none z-10">
                        
                        {/* Title and View indicator */}
                        <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                            {img.title && (
                                <h4 className="text-white text-base font-bold tracking-tight mb-1.5 drop-shadow-md">
                                    {img.title}
                                </h4>
                            )}
                            <span className="text-cyan-400 text-xs font-bold tracking-wider uppercase flex items-center gap-1.5">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                                <span>View Photo</span>
                            </span>
                        </div>
                    </div>
                </motion.div>
            ))}
        </motion.div>
    );
}
