import Navbar from "@/components/Navbar";
import PageHero from "@/components/PageHero";
import PremiumFooter from "@/components/PremiumFooter";
import EnterpriseServices from "@/components/Service";
import TechArchitecture from "@/components/solutions/TechArchitecture";
import SolutionsProcess from "@/components/solutions/SolutionsProcess";
import CTASection from "@/components/CTASection";

export const metadata = {
    title: "Enterprise Solutions | RecentureSoft",
    description: "Explore our premium enterprise solutions, digital intelligence, and modern technology architecture.",
};

export default function SolutionsPage() {
    return (
        <main className="bg-slate-50 dark:bg-[#020617] min-h-screen">
            <Navbar />
            
            <PageHero
                badge="Our Expertise"
                title="Engineering"
                highlight="Digital Excellence"
                description="Discover our comprehensive suite of enterprise-grade solutions. We architect scalable, secure, and blazing fast digital products."
            />

            <EnterpriseServices />

            <TechArchitecture />

            <SolutionsProcess />

            <CTASection
                title="Transform Your Architecture"
                description="Ready to upgrade your tech stack with our premium engineering solutions? Let's build the future together."
                primaryBtnText="Start Your Project"
                secondaryBtnText="Schedule Consultation"
            />
            
            <PremiumFooter />
        </main>
    );
}
