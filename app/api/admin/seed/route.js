import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Service from "@/models/Service";

export async function GET() {
    try {
        await connectDB();

        const servicesData = [
            {
                category: "Enterprise Engineering",
                title: "Software & Dashboards",
                slug: "software-and-dashboards",
                description: "Bespoke admin panels, CRM systems, and business intelligence dashboards designed to streamline your daily operations.",
                shortDescription: "Bespoke admin panels, CRM systems, and BI dashboards.",
                features: ["Dashboards", "CRM", "Portals", "React"],
                scene: "SoftwareDevGraphic",
                colSpan: "lg:col-span-7",
                color: "cyan",
                accent: "from-cyan-500/20 to-blue-500/20",
                status: true
            },
            {
                category: "Growth Intelligence",
                title: "Digital Marketing & SEO",
                slug: "digital-marketing-and-seo",
                description: "Data-driven marketing, SEO optimization, and high-conversion landing pages to scale your business visibility locally and globally.",
                shortDescription: "Data-driven marketing, SEO, and landing pages.",
                features: ["SEO", "Marketing", "Ads", "Conversion"],
                scene: "DigitalMarketingGraphic",
                colSpan: "lg:col-span-5",
                color: "teal",
                accent: "from-teal-500/20 to-emerald-500/20",
                status: true
            },
            {
                category: "Mobile Ecosystem",
                title: "Mobile-First Booking Apps",
                slug: "mobile-first-booking-apps",
                description: "Flawless mobile experiences that allow customers to easily book services, check availability, and interact with your business seamlessly on the go.",
                shortDescription: "Flawless mobile booking experiences.",
                features: ["Mobile First", "Cross-Platform", "UX/UI Design", "Web Apps"],
                scene: "MobileAppGraphic",
                colSpan: "lg:col-span-5",
                color: "purple",
                accent: "from-purple-500/20 to-fuchsia-500/20",
                status: true
            },
            {
                category: "Digital Experience",
                title: "Custom Web Platforms",
                slug: "custom-web-platforms",
                description: "Tailored web platforms with integrated booking systems. We build responsive, accessible, and highly optimized websites that drive conversions and local growth.",
                shortDescription: "Tailored web platforms with booking systems.",
                features: ["E-Commerce", "Booking Systems", "Performance", "Custom UI"],
                scene: "WebDevGraphic",
                colSpan: "lg:col-span-7",
                color: "blue",
                accent: "from-blue-500/20 to-indigo-500/20",
                status: true
            }
        ];

        // Clear existing to avoid duplicates
        await Service.deleteMany({});
        await Service.insertMany(servicesData);

        return NextResponse.json({ success: true, message: "Successfully seeded 4 services" });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
