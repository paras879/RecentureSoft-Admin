import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '.env.local') });

const ServiceSchema = new mongoose.Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    shortDescription: { type: String },
    description: { type: String },
    image: { type: String },
    icon: { type: String },
    features: [{ type: String }],
    category: { type: String, default: "Enterprise Engineering" },
    colSpan: { type: String, default: "lg:col-span-6" },
    color: { type: String, default: "cyan" },
    accent: { type: String, default: "from-cyan-500/20 to-blue-500/20" },
    scene: { type: String, default: "SoftwareDevGraphic" },
    status: { type: Boolean, default: true }
}, { timestamps: true });

const Service = mongoose.models.Service || mongoose.model("Service", ServiceSchema, "Service");

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

async function seed() {
    try {
        console.log("Connecting to MongoDB:", process.env.MONGODB_URI ? "Found URI" : "NO URI");
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to MongoDB.");

        await Service.deleteMany({});
        console.log("Cleared existing services.");

        await Service.insertMany(servicesData);
        console.log("Successfully seeded 4 services.");

        process.exit(0);
    } catch (error) {
        console.error("Error seeding data:", error);
        process.exit(1);
    }
}

seed();
