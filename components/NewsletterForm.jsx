"use client";

export default function NewsletterForm() {
    return (
        <form className="relative" onSubmit={(e) => e.preventDefault()}>
            <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-full px-6 py-3 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 transition-colors"
            />
            <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 bg-cyan-500 text-white p-2 rounded-full hover:bg-cyan-400 transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
            </button>
        </form>
    );
}
