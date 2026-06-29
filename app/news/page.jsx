import Navbar from "@/components/Navbar";
import PageHero from "@/components/PageHero";
import PremiumFooter from "@/components/PremiumFooter";
import NewsList from "@/components/news/NewsList";
import CTASection from "@/components/CTASection";

export const metadata = {
    title: "Tech Pulse | Live Technology News & Insights",
    description: "Stay informed with the latest breaking global technology news, tech industry updates, developer trends, and digital innovations.",
};

export default function NewsPage() {
    return (
        <main className="bg-slate-50 dark:bg-[#020617] min-h-screen">
            <Navbar />
            <PageHero
                badge="Live Updates"
                title="Tech"
                highlight="Pulse"
                description="Discover real-time global technology news, breaking industry insights, and digital innovations."
            />

            <div className="relative -mt-6 md:-mt-4">
                <NewsList />
            </div>

            <div className="relative -mt-6 md:-mt-6">
                <CTASection
                    title="Media Inquiries"
                    description="Are you a journalist or analyst? Get in touch with our PR team for press kits, interviews, and official comments."
                    primaryBtnText="Contact PR Team"
                    secondaryBtnText="Download Press Kit"
                />
            </div>
            <PremiumFooter />
        </main>
    );
}
