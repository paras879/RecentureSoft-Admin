import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import WebPage from "@/models/WebPage";

export async function GET() {
    try {
        await connectDB();
        
        const allStaticPages = [
            { name: "Home", path: "/" },
            { name: "About Us", path: "/about" },
            { name: "Amazon Store Management", path: "/amazon-store-management" },
            { name: "Android App Development", path: "/android-application-development" },
            { name: "Blog", path: "/blog" },
            { name: "Career", path: "/career" },
            { name: "CMS Development", path: "/cms" },
            { name: "Contact Us", path: "/contact" },
            { name: "Content Writing", path: "/content-writing" },
            { name: "Cookies Policy", path: "/cookies" },
            { name: "CRM Development", path: "/crm" },
            { name: "eBay Store Management", path: "/ebay-store-management" },
            { name: "Events", path: "/events" },
            { name: "iPad App Development", path: "/ipad-app-development" },
            { name: "iPhone App Development", path: "/iphone-apps-development" },
            { name: "Magento Development", path: "/magento-development" },
            { name: "News", path: "/news" },
            { name: "Next.js Development", path: "/next-js" },
            { name: "Node.js Development", path: "/node-js" },
            { name: "OpenCart Development", path: "/opencart-development" },
            { name: "Portfolio", path: "/portfolio" },
            { name: "Privacy Policy", path: "/privacy-policy" },
            { name: "React Development", path: "/react" },
            { name: "React Native Development", path: "/react-native" },
            { name: "Salesforce Solutions", path: "/salesforce" },
            { name: "SEO Packages", path: "/seo-package" },
            { name: "SEO Services", path: "/seo-service" },
            { name: "HTML Sitemap", path: "/sitemap" },
            { name: "Social Networking Apps", path: "/social-networking" },
            { name: "Solutions", path: "/solutions" },
            { name: "Terms & Conditions", path: "/terms" },
            { name: "Web Design", path: "/web-design" },
            { name: "WordPress Development", path: "/wordpress-development-customization" }
        ];

        // Seed pages if they don't exist
        for (const page of allStaticPages) {
            await WebPage.updateOne(
                { path: page.path },
                { $setOnInsert: { name: page.name, path: page.path } },
                { upsert: true }
            );
        }

        const pages = await WebPage.find().sort({ createdAt: 1 }).lean();

        return NextResponse.json({ success: true, pages });
    } catch (error) {
        console.error("Error fetching pages:", error);
        return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        await connectDB();
        const data = await req.json();
        
        if (!data.name || !data.path) {
            return NextResponse.json({ success: false, message: "Name and path are required" }, { status: 400 });
        }
        
        const formattedPath = data.path.startsWith("/") ? data.path : `/${data.path}`;
        
        const existing = await WebPage.findOne({ path: formattedPath });
        if (existing) {
            return NextResponse.json({ success: false, message: "Page with this path already exists" }, { status: 400 });
        }
        
        const newPage = await WebPage.create({
            name: data.name,
            path: formattedPath,
            status: "active"
        });
        
        return NextResponse.json({ success: true, page: newPage });
    } catch (error) {
        console.error("Error creating page:", error);
        return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
    }
}

export async function PUT(req) {
    try {
        await connectDB();
        const data = await req.json();
        
        if (!data.id) {
            return NextResponse.json({ success: false, message: "ID is required" }, { status: 400 });
        }
        
        const updateData = {};
        if (data.status !== undefined) updateData.status = data.status;
        if (data.seoTitle !== undefined) updateData.seoTitle = data.seoTitle;
        if (data.seoDescription !== undefined) updateData.seoDescription = data.seoDescription;
        if (data.content !== undefined) updateData.content = data.content;
        
        const updatedPage = await WebPage.findByIdAndUpdate(
            data.id,
            updateData,
            { new: true }
        );
        
        if (!updatedPage) {
            return NextResponse.json({ success: false, message: "Page not found" }, { status: 404 });
        }
        
        return NextResponse.json({ success: true, page: updatedPage });
    } catch (error) {
        console.error("Error updating page:", error);
        return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
    }
}
