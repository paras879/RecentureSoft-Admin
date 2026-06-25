import Navbar from "@/components/Navbar";
import PremiumFooter from "@/components/PremiumFooter";
import CinematicAbout from "@/components/about/CinematicAbout";

export const metadata = {
    title: "About RecentureSoft | Digital Innovation & Enterprise Technology",
    description:
        "Discover RecentureSoft's mission, vision, culture, and expertise in AI, cloud computing, web development, mobile applications, and enterprise digital transformation.",
};

export default function AboutPage() {
    return (
        <main className="relative bg-slate-50 dark:bg-[#020617] transition-colors duration-300 min-h-screen overflow-x-hidden">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-cyan-500/10 blur-[140px] rounded-full" />
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500/10 blur-[140px] rounded-full" />
            </div>
            <Navbar />
            <CinematicAbout />
            <PremiumFooter />
        </main>
    );
}
