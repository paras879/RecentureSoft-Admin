"use client";

// React hooks removed for native CSS optimization
import AboutSection from "./AboutSection";
import Service from "./Service";
import TechStack from "./TechStack";
import Review from "./Review";
import Status from "./StatsDashboard";
import TrustedClients from "./TrustedClients";
import FutureFooter from "./FutureFooter";

// Native CSS optimized section wrapper for smooth mobile scrolling
function LazySection({ children, minHeight, id }) {
    return (
        <div 
            id={id}
            style={{ 
                contentVisibility: "auto", 
                containIntrinsicSize: `auto ${minHeight}`, 
                minHeight: minHeight 
            }}
            className="w-full relative"
        >
            {children}
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
