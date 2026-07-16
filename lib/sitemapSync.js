import { connectDB } from "@/lib/mongodb";
import SitemapEntry from "@/models/SitemapEntry";
import WebPage from "@/models/WebPage";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://recenturesoft.com";

const STATIC_ROUTES = [
    { path: "/", name: "Home" },
    { path: "/about", name: "About" },
    { path: "/contact", name: "Contact" },
    { path: "/portfolio", name: "Portfolio" },
    { path: "/blog", name: "Blog" },
    { path: "/news", name: "News" },
    { path: "/career", name: "Career" },
    { path: "/events", name: "Events" },
    { path: "/solutions", name: "Solutions" },
    { path: "/crm", name: "CRM Solutions" },
    { path: "/cms", name: "CMS Development" },
    { path: "/dashboard", name: "Dashboard Development" },
    { path: "/salesforce", name: "Salesforce Development" },
    { path: "/web-design", name: "Web Design" },
    { path: "/seo-service", name: "SEO Services" },
    { path: "/seo-package", name: "SEO Packages" },
    { path: "/social-networking", name: "Social Networking" },
    { path: "/content-writing", name: "Content Writing" },
    { path: "/next-js", name: "Next.js Development" },
    { path: "/react", name: "React Development" },
    { path: "/node-js", name: "Node.js Development" },
    { path: "/php-development", name: "PHP Development" },
    { path: "/laravel-development", name: "Laravel Development" },
    { path: "/python-development", name: "Python Development" },
    { path: "/javascript-development", name: "JavaScript Development" },
    { path: "/flutter", name: "Flutter Development" },
    { path: "/magento-development", name: "Magento Development" },
    { path: "/opencart-development", name: "OpenCart Development" },
    { path: "/wordpress-development-customization", name: "WordPress Development" },
    { path: "/amazon-store-management", name: "Amazon Store Management" },
    { path: "/ebay-store-management", name: "eBay Store Management" },
    { path: "/iphone-apps-development", name: "iPhone App Development" },
    { path: "/ipad-app-development", name: "iPad App Development" },
    { path: "/android-application-development", name: "Android App Development" },
    { path: "/react-native", name: "React Native Development" },
    { path: "/ai-seo", name: "AI SEO" },
    { path: "/generative-ai", name: "Generative AI" },
    { path: "/ai-consulting-services", name: "AI Consulting Services" },
    { path: "/ai-agent-development", name: "AI Agent Development" },
    { path: "/ai-chatbot-development", name: "AI Chatbot Development" },
    { path: "/rag-development", name: "RAG Development" },
];

const LEGAL_ROUTES = [
    { path: "/privacy-policy", name: "Privacy Policy", priority: 0.3, changeFrequency: "yearly" },
    { path: "/terms", name: "Terms & Conditions", priority: 0.3, changeFrequency: "yearly" },
    { path: "/cookies", name: "Cookie Policy", priority: 0.3, changeFrequency: "yearly" },
];

export async function syncSitemap() {
    await connectDB();

    const now = new Date();
    const activePaths = new Set();

    const upsertEntries = async (entries, section, source) => {
        for (const entry of entries) {
            const path = entry.path.startsWith("/") ? entry.path : `/${entry.path}`;
            activePaths.add(path);

            const canonical = `${baseUrl}${path === "/" ? "" : path}`;
            const priority = entry.priority ?? (section === "legal" ? 0.3 : 0.7);
            const changeFrequency = entry.changeFrequency ?? "monthly";

            await SitemapEntry.updateOne(
                { path },
                {
                    $set: {
                        name: entry.name,
                        section,
                        lastModified: entry.lastModified || now,
                        priority,
                        changeFrequency,
                        canonical,
                        status: "active",
                        source,
                    },
                },
                { upsert: true }
            );
        }
    };

    // 1. Sync static information pages
    await upsertEntries(STATIC_ROUTES, "information", "static");

    // 2. Sync legal pages
    await upsertEntries(LEGAL_ROUTES, "legal", "legal");

    // 3. Sync dynamic WebPages
    const webPages = await WebPage.find({}).lean();

    const infoPages = [];
    const locationPages = [];

    for (const page of webPages) {
        const entry = {
            path: page.path,
            name: page.name,
            lastModified: page.updatedAt || page.createdAt || now,
            priority: page.status === "active" ? 0.7 : 0.3,
        };

        if (page.templateType === "location-template") {
            locationPages.push(entry);
        } else {
            infoPages.push(entry);
        }

        if (page.status !== "active") {
            const fullPath = page.path.startsWith("/") ? page.path : `/${page.path}`;
            await SitemapEntry.updateOne(
                { path: fullPath },
                { $set: { status: "inactive" } }
            );
        }
    }

    await upsertEntries(infoPages, "information", "webpage");
    await upsertEntries(locationPages, "locations", "location");

    // 4. Deactivate entries that no longer exist in any source
    await SitemapEntry.updateMany(
        { path: { $nin: Array.from(activePaths) }, status: "active" },
        { $set: { status: "inactive" } }
    );

    const count = await SitemapEntry.countDocuments({ status: "active" });

    return { success: true, count, syncedAt: now };
}
