import Link from "next/link";
import {
    FaFacebookF,
    FaTwitter,
    FaLinkedinIn,
    FaPinterestP,
    FaInstagram,
    FaYoutube,
} from "react-icons/fa";


/* ═══════════════════════════════════════════════════════
   TOKENS & DATA
   ═══════════════════════════════════════════════════════ */
const FOOTER_LINKS = {
    "Quick Links": ["About Us", "Our Approach", "Careers", "Contact"],
    "Services": ["Custom Software", "Cloud Engineering", "AI Solutions", "Mobile Apps"],
    "Technologies": ["React & Next.js", "Node & Python", "AWS Cloud", "Docker & K8s"],
    "Resources": ["Case Studies", "Blog", "Documentation", "API References"],
};

/* ═══════════════════════════════════════════════════════
   UTILITY COMPONENTS
   ═══════════════════════════════════════════════════════ */
function GlassCard({ children, hoverColorClass = "from-primary to-accent", className = "" }) {
    return (
        <div
            className={`group relative rounded-2xl cursor-pointer hover:-translate-y-3 hover:scale-[1.03] hover:shadow-[0_25px_60px_rgba(99,102,241,0.15)] transition-all duration-500 ${className}`}
        >
            <div
                className={`relative p-5 md:p-6 rounded-2xl min-h-[120px] h-full overflow-hidden flex flex-col justify-center z-10 bg-white/50 dark:bg-white/5 border border-slate-200 dark:border-white/10 backdrop-blur-xl shadow-premium`}
            >
                {/* Border trace animation on hover */}
                <div
                    className={`absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-30 bg-gradient-to-tr ${hoverColorClass} mix-blend-overlay transition-opacity duration-300`}
                />
                <div className="relative z-20">{children}</div>
            </div>
        </div>
    );
}

// SVG Icons
const Icons = {
    Facebook: () => (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35C.595 0 0 .595 0 1.326v21.348C0 23.405.595 24 1.326 24H12.82v-9.294H9.692V11.08h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24h-1.918c-1.505 0-1.796.716-1.796 1.765v2.307h3.587l-.467 3.626H16.56V24h6.115C23.405 24 24 23.405 24 22.674V1.326C24 .595 23.405 0 22.675 0z" /></svg>
    ),
    Pinterest: () => (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.372 0 0 5.373 0 12c0 4.99 3.045 9.268 7.38 11.094-.102-.943-.194-2.39.04-3.42.212-.93 1.367-5.918 1.367-5.918s-.349-.698-.349-1.73c0-1.62.94-2.83 2.11-2.83.995 0 1.475.747 1.475 1.642 0 1-.636 2.496-.964 3.882-.274 1.158.58 2.102 1.72 2.102 2.064 0 3.65-2.177 3.65-5.32 0-2.78-2-4.725-4.857-4.725-3.31 0-5.254 2.483-5.254 5.05 0 1 .384 2.073.864 2.655a.348.348 0 01.08.334c-.09.368-.292 1.158-.332 1.32-.052.214-.174.26-.402.157-1.5-.698-2.44-2.89-2.44-4.65 0-3.785 2.75-7.264 7.93-7.264 4.163 0 7.402 2.968 7.402 6.932 0 4.138-2.61 7.47-6.232 7.47-1.217 0-2.362-.632-2.752-1.378l-.748 2.85c-.27 1.04-1.003 2.34-1.494 3.135A12.01 12.01 0 0012 24c6.628 0 12-5.373 12-12S18.628 0 12 0z" /></svg>
    ),
    Instagram: () => (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M7.75 2C4.574 2 2 4.574 2 7.75v8.5C2 19.426 4.574 22 7.75 22h8.5C19.426 22 22 19.426 22 16.25v-8.5C22 4.574 19.426 2 16.25 2h-8.5zm0 2h8.5A3.75 3.75 0 0120 7.75v8.5A3.75 3.75 0 0116.25 20h-8.5A3.75 3.75 0 014 16.25v-8.5A3.75 3.75 0 017.75 4zm8.75 1a1.25 1.25 0 100 2.5 1.25 1.25 0 000-2.5zM12 7a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6z" /></svg>
    ),
    YouTube: () => (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a2.997 2.997 0 00-2.11-2.12C19.503 3.5 12 3.5 12 3.5s-7.503 0-9.388.566a2.997 2.997 0 00-2.11 2.12C0 8.08 0 12 0 12s0 3.92.502 5.814a2.997 2.997 0 002.11 2.12C4.497 20.5 12 20.5 12 20.5s7.503 0 9.388-.566a2.997 2.997 0 002.11-2.12C24 15.92 24 12 24 12s0-3.92-.502-5.814zM9.75 15.5v-7l6 3.5-6 3.5z" /></svg>
    ),
    Twitter: () => <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" /></svg>,
    LinkedIn: () => <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>,
    GitHub: () => <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>,
    Dribbble: () => <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm8.793-12.26c-.16-.046-3.111-.884-6.666-.345-.733-1.921-1.545-3.791-2.42-5.556 2.836-1.121 4.298-2.617 4.417-2.748-1.748-1.637-4.148-2.646-6.79-2.646-1.724 0-3.344.444-4.789 1.217 1.838 1.574 3.731 4.542 4.488 6.945-3.921 1.096-7.857 1.157-8.243 1.157v.149c0 1.905.47 3.705 1.306 5.276 1.159-2.072 4.093-3.057 5.719-3.415 1.586 4.27 2.378 8.019 2.508 8.66 1.704.422 3.5.422 5.205 0-.106-.522-.843-3.985-2.28-8.136 3.093-.326 5.924.966 6.136 1.07.729-1.512 1.139-3.219 1.139-5.011 0-.613-.053-1.213-.153-1.794zm-14.772.392c.319 0 3.784-.046 7.42-1.05-.722-2.146-2.404-4.887-4.053-6.286-1.901 1.597-3.155 3.964-3.367 6.662v.674zm9.324 8.78c-.147-.643-.918-4.3-2.441-8.384-1.464.316-4.153 1.229-5.184 3.125 1.848 2.766 4.673 4.646 7.625 5.259zm4.273-3.454c-.23-.122-2.839-1.465-5.694-1.078 1.344 3.96 2.012 7.158 2.095 7.575 1.564-.993 2.871-2.43 3.599-4.167.001-.001-.001-.001 0 0z" /></svg>,
    Email: () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
    Phone: () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>,
    MapPin: () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
};


/* ═══════════════════════════════════════════════════════
   BACKGROUND EFFECTS
   ═══════════════════════════════════════════════════════ */
function FooterBackground() {
    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {/* Noise */}
            <div
                className="absolute inset-0 opacity-[0.02] mix-blend-overlay dark:opacity-[0.05]"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
            />

            {/* Subtle Auroras (Static) */}
            <div
                className="absolute top-[-20%] left-[20%] w-[600px] h-[600px] rounded-full opacity-[0.1] dark:opacity-[0.04]"
                style={{ background: `radial-gradient(circle, var(--color-primary), transparent 70%)`, filter: "blur(100px)" }}
            />
            <div
                className="absolute bottom-[-10%] right-[10%] w-[800px] h-[800px] rounded-full opacity-[0.1] dark:opacity-[0.04]"
                style={{ background: `radial-gradient(circle, var(--color-accent), transparent 70%)`, filter: "blur(100px)" }}
            />
        </div>
    );
}

/* ═══════════════════════════════════════════════════════
   MAIN FOOTER COMPONENT
   ═══════════════════════════════════════════════════════ */
export default function FutureFooter() {
    return (
        <footer
            className="relative bg-gradient-to-br from-slate-50 via-white to-indigo-50 dark:from-slate-950 dark:via-[#090d16] dark:to-slate-950 text-slate-800 dark:text-slate-300 overflow-hidden pt-8 md:pt-10 lg:pt-12 pb-8 border-t border-slate-200 dark:border-white/5 transition-colors duration-300"
        >
            <FooterBackground />

            <div className="relative z-10 max-w-7xl mx-auto px-6">

                {/* ════ PREMIUM GRID (Navigation & Brand) ════ */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 lg:gap-8 mb-8 md:mb-10 lg:mb-12">

                    {/* LEFT COLUMN: Logo & Socials */}
                    <div className="lg:col-span-5 flex flex-col pr-0 lg:pr-10">
                        <div
                            className="flex items-center gap-4 mb-4 md:mb-8"
                        >
                            <span className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-500 dark:from-white dark:to-gray-400">
                                Recenturesoft
                            </span>
                        </div>

                        <p
                            className="text-slate-600 dark:text-gray-400 text-base leading-relaxed mb-6 md:mb-10 max-w-sm"
                        >
                            Engineering Tomorrow&apos;s Digital Future. We build resilient, globally distributed systems and award-winning enterprise user experiences.
                        </p>

                        <div
                            className="flex gap-4 justify-center lg:justify-start"
                        >
                            {[
                                { name: "Facebook", icon: FaFacebookF, bg: "bg-[#4267B2]", url: "https://facebook.com/recenturesoft" },
                                { name: "Twitter", icon: FaTwitter, bg: "bg-[#1DA1F2]", url: "https://x.com/recenturesoft" },
                                { name: "LinkedIn", icon: FaLinkedinIn, bg: "bg-[#0A66C2]", url: "https://linkedin.com/company/recenturesoft" },
                                { name: "Pinterest", icon: FaPinterestP, bg: "bg-[#E60023]", url: "https://pinterest.com/recenturesoft" },
                                { name: "Instagram", icon: FaInstagram, bg: "bg-gradient-to-r from-pink-500 to-fuchsia-500", url: "https://instagram.com/recenturesoft" },
                                { name: "YouTube", icon: FaYoutube, bg: "bg-[#FF0000]", url: "https://youtube.com/@recenturesoft" }
                            ].map(({ name, icon: Icon, bg, url }) => (
                                <a
                                    key={name}
                                    href={url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={name}
                                    className={`w-12 h-12 rounded-full ${bg} flex items-center justify-center text-white hover:scale-110 transition-all`}
                                >
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* CENTER COLUMNS: Navigation Links */}
                    <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
                        {Object.entries(FOOTER_LINKS).map(([category, links]) => (
                            <div
                                key={category}
                            >
                                <h4 className="text-slate-900 dark:text-white font-semibold mb-6 tracking-wide text-sm">{category}</h4>
                                <ul className="space-y-4">
                                    {links.map((link, linkIdx) => (
                                        <li key={linkIdx}>
                                            <Link href="#" className="text-slate-600 dark:text-gray-400 text-sm hover:text-primary dark:hover:text-white transition-colors relative group block w-fit">
                                                <span className="relative z-10 group-hover:translate-x-2 inline-block transition-transform duration-300">{link}</span>
                                                <span className="absolute left-0 -bottom-1 w-0 h-[1px] transition-all duration-300 group-hover:w-full bg-primary" />
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ════ CONTACT & CERTIFICATIONS CARDS ════ */}
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-10">
                    <GlassCard hoverColorClass="from-cyan-400 to-blue-500">
                        <div className="flex flex-col h-full justify-center">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="p-2 rounded-lg bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-gray-400">
                                    <Icons.Email />
                                </div>
                                <span className="text-xs uppercase tracking-widest text-slate-600 dark:text-gray-400 font-semibold">Email Us</span>
                            </div>
                            <span className="text-slate-800 dark:text-white font-medium hover:text-primary transition-colors cursor-pointer text-lg">info@recenturesoft.com</span>
                        </div>
                    </GlassCard>
                    <GlassCard hoverColorClass="from-blue-500 to-indigo-500">
                        <div className="flex flex-col h-full justify-center">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="p-2 rounded-lg bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-gray-400">
                                    <Icons.Phone />
                                </div>
                                <span className="text-xs uppercase tracking-widest text-slate-600 dark:text-gray-400 font-semibold">Call Us</span>
                            </div>
                            <span className="text-slate-800 dark:text-white font-medium text-lg">+91 777 000 3288</span>
                        </div>
                    </GlassCard>
                    <GlassCard hoverColorClass="from-purple-500 to-pink-500">
                        <div className="flex flex-col h-full justify-center">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="p-2 rounded-lg bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-gray-400">
                                    <Icons.MapPin />
                                </div>
                                <span className="text-xs uppercase tracking-widest text-slate-600 dark:text-gray-400 font-semibold">Headquarters </span>
                            </div>
                            <span className="text-slate-800 dark:text-white font-medium text-sm leading-relaxed pl-12">A-125, Sector-63,<br />Noida, UP 201301</span>
                        </div>
                    </GlassCard>
                </div>

                {/* ════ PREMIUM BOTTOM BAR ════ */}
                <div className="relative pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-slate-600 dark:text-gray-400">
                    <div
                        className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-slate-200 dark:via-white/15 to-transparent"
                    />

                    <p className="order-2 md:order-1 font-medium tracking-wide">© 2026 Recenturesoft. All rights reserved.</p>

                    <div className="flex flex-wrap justify-center gap-10 sm:gap-8 order-1 md:order-2">
                        <Link href="/privacy_policy" className="hover:text-primary dark:hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="#" className="hover:text-primary dark:hover:text-white transition-colors">Terms of Service</Link>
                        <Link href="#" className="hover:text-primary dark:hover:text-white transition-colors">Cookies</Link>
                    </div>
                </div>

            </div>
        </footer>
    );
}
