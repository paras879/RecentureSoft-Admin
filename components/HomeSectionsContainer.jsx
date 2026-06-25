"use client";

import { useState, useEffect, useRef } from "react";
import AboutSection from "./AboutSection";
import Service from "./Service";
import TechStack from "./TechStack";
import Review from "./Review";
import Status from "./StatsDashboard";
import TrustedClients from "./TrustedClients";
import FutureFooter from "./FutureFooter";

// Lazy wrapper component to conditionally mount sections
function LazySection({ children, minHeight, id }) {
    const [shouldRender, setShouldRender] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
        // Desktop mounts immediately to preserve layout and desktop score
        if (window.innerWidth >= 768) {
            setShouldRender(true);
            return;
        }

        // Mobile uses IntersectionObserver to defer mounting until scrolled near
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setShouldRender(true);
                    observer.disconnect();
                }
            },
            {
                rootMargin: "350px 0px", // pre-render 350px before entering screen
            }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => {
            observer.disconnect();
        };
    }, []);

    return (
        <div 
            ref={containerRef} 
            id={id}
            style={{ minHeight: shouldRender ? "auto" : minHeight }}
            className="w-full relative"
        >
            {shouldRender ? children : null}
        </div>
    );
}

export default function HomeSectionsContainer() {
    return (
        <>
            <LazySection minHeight="500px" id="about-lazy">
                <AboutSection />
            </LazySection>

            <LazySection minHeight="700px" id="service-lazy">
                <Service />
            </LazySection>

            <LazySection minHeight="600px" id="techstack-lazy">
                <TechStack />
            </LazySection>

            <LazySection minHeight="500px" id="review-lazy">
                <Review />
            </LazySection>

            <LazySection minHeight="800px" id="status-lazy">
                <Status />
            </LazySection>

            <LazySection minHeight="250px" id="clients-lazy">
                <TrustedClients />
            </LazySection>

            <LazySection minHeight="500px" id="footer-lazy">
                <FutureFooter />
            </LazySection>
        </>
    );
}
