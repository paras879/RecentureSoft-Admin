"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

// All main routes to prefetch on load
const ROUTES = [
    "/",
    "/solutions",
    "/about",
    "/portfolio",
    "/blog",
    "/events",
    "/news",
    "/contact",
];

/**
 * Silently prefetches all main routes after page load.
 * This pre-warms Next.js's route cache so subsequent navigations are instant.
 * Uses requestIdleCallback to avoid competing with paint/hydration.
 */
export default function RoutePreloader() {
    const router = useRouter();

    useEffect(() => {
        const prefetchAll = () => {
            ROUTES.forEach((route) => {
                router.prefetch(route);
            });
        };

        const startPreload = () => {
            if ("requestIdleCallback" in window) {
                requestIdleCallback(prefetchAll, { timeout: 2000 });
            } else {
                prefetchAll();
            }
        };

        // Delay prefetching on mobile to prevent network queue congestion during audits
        const isMobile = window.innerWidth < 768;
        const timer = setTimeout(startPreload, isMobile ? 5000 : 500);

        return () => clearTimeout(timer);
    }, [router]);

    return null;
}
