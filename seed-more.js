const mongoose = require('mongoose');

const MONGODB_URI = "mongodb+srv://admin:LdO4R0W3C1zT1uQJ@cluster0.o7xur.mongodb.net/recenturesoft?retryWrites=true&w=majority&appName=Cluster0";

const defaultDashboardContent = {
    hero: {
        title: "Custom Dashboard",
        highlight: "Development",
        description: "Consolidate complex data into intuitive, real-time visual interfaces that empower your team to make faster, smarter decisions."
    },
    contentTitle: "Transform Raw Data into",
    contentSubtitle: "Actionable Insights",
    introParagraphs: [
        "In today's fast-paced digital economy, data is your most valuable asset. However, raw data without proper visualization is just noise. At RecentureSoft, we specialize in developing custom, high-performance dashboard applications that consolidate complex datasets into intuitive, easy-to-understand visual interfaces.",
        "Whether you need an internal admin panel, a client-facing analytics portal, or a complex financial trading dashboard, our engineering team uses cutting-edge technologies like React, Next.js, and advanced charting libraries to build solutions that empower decision-making."
    ],
    features: [
        {
            icon: "LayoutDashboard",
            title: "Customizable Interfaces",
            desc: "Drag-and-drop widgets and personalized layouts tailored to your unique business requirements.",
            highlights: ["Drag & Drop widgets", "Personalized layouts", "Role-based views"]
        },
        {
            icon: "BarChart3",
            title: "Real-time Analytics",
            desc: "Monitor KPIs and metrics in real-time with automatically refreshing data streams.",
            highlights: ["Live data streams", "Instant KPI tracking", "Automated refresh"]
        },
        {
            icon: "Database",
            title: "Data Integration",
            desc: "Seamlessly connect multiple data sources, APIs, and databases into a single unified view.",
            highlights: ["Multi-source syncing", "REST & GraphQL APIs", "Legacy system support"]
        },
        {
            icon: "Activity",
            title: "Interactive Reporting",
            desc: "Generate dynamic, interactive reports that allow users to drill down into the specifics.",
            highlights: ["Drill-down charts", "Export to PDF/Excel", "Scheduled email reports"]
        },
        {
            icon: "ShieldCheck",
            title: "Enterprise Security",
            desc: "Role-based access control and advanced encryption to keep your data secure.",
            highlights: ["End-to-end encryption", "Granular permissions", "SSO integration"]
        },
        {
            icon: "Zap",
            title: "High Performance",
            desc: "Optimized queries and rendering to ensure your dashboard loads instantly even with big data.",
            highlights: ["Query optimization", "Edge caching", "Virtualization"]
        }
    ]
};

const defaultSolutionsContent = {
    hero: {
        badge: "Our Expertise",
        title: "Engineering",
        highlight: "Digital Excellence",
        description: "Discover our comprehensive suite of enterprise-grade solutions. We architect scalable, secure, and blazing fast digital products."
    },
    cta: {
        title: "Transform Your Architecture",
        description: "Ready to upgrade your tech stack with our premium engineering solutions? Let's build the future together.",
        primaryBtnText: "Start Your Project",
        secondaryBtnText: "Schedule Consultation"
    }
};

async function seed() {
    await mongoose.connect(MONGODB_URI);
    const db = mongoose.connection.db;

    // dashboard
    await db.collection('webpages').updateOne(
        { path: "/dashboard" },
        { 
            $set: { 
                content: defaultDashboardContent,
                seoTitle: "Custom Dashboard Development Company | RecentureSoft",
                seoDescription: "Build custom, high-performance, data-driven dashboard applications with RecentureSoft. Transform raw data into actionable insights.",
                status: true,
                isDynamic: true
            }
        },
        { upsert: true }
    );

    // solutions
    await db.collection('webpages').updateOne(
        { path: "/solutions" },
        { 
            $set: { 
                content: defaultSolutionsContent,
                seoTitle: "Enterprise Solutions | RecentureSoft",
                seoDescription: "Explore our premium enterprise solutions, digital intelligence, and modern technology architecture.",
                status: true,
                isDynamic: true
            }
        },
        { upsert: true }
    );

    console.log("Seeded /dashboard and /solutions");
    process.exit(0);
}
seed();
