import Navbar from "@/components/Navbar";
import PageHero from "@/components/PageHero";
import PremiumFooter from "@/components/PremiumFooter";
import ProjectGallery from "@/components/portfolio/ProjectGallery";
import Transformations from "@/components/portfolio/Transformations";
import CTASection from "@/components/CTASection";
import { connectDB } from "@/lib/mongodb";
import Portfolio from "@/models/Portfolio";

export const metadata = {
    title: "Portfolio | Enterprise Projects & Case Studies | RecentureSoft",
    description:
        "Explore RecentureSoft's portfolio of enterprise software, AI solutions, web applications, mobile apps, cloud platforms, and digital transformation success stories.",
};

export const dynamic = "force-dynamic";

export default async function PortfolioPage() {
    let projects = [];
    
    try {
        await connectDB();
        const docs = await Portfolio.find({}).lean();
        projects = docs.map(doc => ({
            _id: doc._id.toString(),
            title: doc.title || "",
            slug: doc.slug || "",
            description: doc.description || "",
            projectUrl: doc.projectUrl || "",
            image: doc.image || doc.images || "",
            technologies: doc.technologies || []
        }));
    } catch (error) {
        console.error("Error fetching portfolios from MongoDB:", error);
    }

    return (
        <main className=" relative bg-slate-50 dark:bg-[#020617] min-h-screen overflow-x-hidden antialiased">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-cyan-500/10 blur-[140px] rounded-full" />
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500/10 blur-[140px] rounded-full" />
            </div>
            <Navbar />
            <PageHero
                badge="Our Work"
                title="Engineering"
                highlight="Success"
                description="Discover award-worthy digital products, enterprise platforms, AI-powered solutions, and transformative experiences engineered to accelerate business growth."
            />

            <ProjectGallery initialProjects={projects} />
            <Transformations />

            <CTASection
                title="Ready to engineer your success?"
                description="Let's create something extraordinary together. Partner with RecentureSoft to build intelligent, scalable, and award-worthy digital products."
                primaryBtnText="Start Your Project"
                secondaryBtnText="Explore Case Studies"
            />
            <PremiumFooter />
        </main>
    );
}

