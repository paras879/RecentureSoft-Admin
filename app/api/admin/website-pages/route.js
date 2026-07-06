import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import WebPage from "@/models/WebPage";

export async function GET() {
    try {
        await connectDB();

        const allStaticPages = [
            { name: "Home", path: "/" },
            { name: "About Us", path: "/about" },
            
            // Software Development
            { name: "CRM Development", path: "/crm", category: "Solutions", subcategory: "Software Development" },
            { name: "CMS Development", path: "/cms", category: "Solutions", subcategory: "Software Development" },
            { name: "Salesforce Solutions", path: "/salesforce", category: "Solutions", subcategory: "Software Development" },
            { name: "Dashboard", path: "/dashboard", category: "Solutions", subcategory: "Software Development" },
            
            // Web Development
            { name: "Next.js Development", path: "/next-js", category: "Solutions", subcategory: "Web Development" },
            { name: "React Development", path: "/react", category: "Solutions", subcategory: "Web Development" },
            { name: "Web Design", path: "/web-design", category: "Solutions", subcategory: "Web Development" },

            // E-Commerce
            { name: "OpenCart Development", path: "/opencart-development", category: "Solutions", subcategory: "E-Commerce" },
            { name: "Magento Development", path: "/magento-development", category: "Solutions", subcategory: "E-Commerce" },
            { name: "eBay Store Management", path: "/ebay-store-management", category: "Solutions", subcategory: "E-Commerce" },
            { name: "Amazon Store Management", path: "/amazon-store-management", category: "Solutions", subcategory: "E-Commerce" },
            { name: "WordPress Development", path: "/wordpress-development-customization", category: "Solutions", subcategory: "E-Commerce" },

            // Mobile App Development
            { name: "iPhone App Development", path: "/iphone-apps-development", category: "Solutions", subcategory: "Mobile App Development" },
            { name: "iPad App Development", path: "/ipad-app-development", category: "Solutions", subcategory: "Mobile App Development" },
            { name: "Android App Development", path: "/android-application-development", category: "Solutions", subcategory: "Mobile App Development" },

            // Technology Solution
            { name: "Node.js Development", path: "/node-js", category: "Solutions", subcategory: "Technology Solution" },
            { name: "React Native Development", path: "/react-native", category: "Solutions", subcategory: "Technology Solution" },

            // Digital Marketing
            { name: "SEO Services", path: "/seo-service", category: "Solutions", subcategory: "Digital Marketing" },
            { name: "SEO Packages", path: "/seo-package", category: "Solutions", subcategory: "Digital Marketing" },
            { name: "Social Networking Apps", path: "/social-networking", category: "Solutions", subcategory: "Digital Marketing" },
            { name: "Content Writing", path: "/content-writing", category: "Solutions", subcategory: "Digital Marketing" },
            { name: "AI SEO", path: "/ai-seo", category: "Solutions", subcategory: "Digital Marketing" },

            // Other Pages
            { name: "Blog", path: "/blog" },
            { name: "Career", path: "/career" },
            { name: "Contact Us", path: "/contact" },
            { name: "Cookies Policy", path: "/cookies" },
            { name: "Events", path: "/events" },
            { name: "News", path: "/news" },
            { name: "Portfolio", path: "/portfolio" },
            { name: "Privacy Policy", path: "/privacy-policy" },
            { name: "HTML Sitemap", path: "/sitemap" },
            { name: "Terms & Conditions", path: "/terms" }
        ];

        let pages = await WebPage.find().sort({ createdAt: 1 }).lean();

        const bulkOps = allStaticPages.map((page) => ({
            updateOne: {
                filter: { path: page.path },
                update: { 
                    $setOnInsert: { name: page.name, path: page.path, status: "active" },
                    $set: { category: page.category || "", subcategory: page.subcategory || "" }
                },
                upsert: true
            }
        }));
        await WebPage.bulkWrite(bulkOps);

        pages = await WebPage.find().sort({ createdAt: 1 }).lean();

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
            status: "active",
            category: data.category || "",
            subcategory: data.subcategory || "",
            templateType: data.templateType || "default"
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
        if (data.category !== undefined) updateData.category = data.category;
        if (data.subcategory !== undefined) updateData.subcategory = data.subcategory;
        if (data.templateType !== undefined) updateData.templateType = data.templateType;

        const updatedPage = await WebPage.findByIdAndUpdate(
            data.id,
            updateData,
            { new: true }
        );

        if (!updatedPage) {
            return NextResponse.json({ success: false, message: "Page not found" }, { status: 404 });
        }

        if (data.status !== undefined) {
            const mainSiteUrl = process.env.MAIN_SITE_URL || "http://localhost:3000";
            const revalSecret = process.env.REVALIDATION_SECRET;

            try {
                await fetch(`${mainSiteUrl}/api/revalidate-pages`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        ...(revalSecret ? { "x-revalidate-secret": revalSecret } : {}),
                    },
                    body: JSON.stringify({
                        path: updatedPage.path,
                    }),
                });
            } catch (revalErr) {
                console.warn("[website-pages] Revalidation ping failed:", revalErr.message);
            }
        }

        return NextResponse.json({ success: true, page: updatedPage });
    } catch (error) {
        console.error("Error updating page:", error);
        return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
    }
}

export async function DELETE(req) {
    try {
        await connectDB();
        const url = new URL(req.url);
        const id = url.searchParams.get("id");

        if (!id) {
            return NextResponse.json({ success: false, message: "ID is required" }, { status: 400 });
        }

        const deletedPage = await WebPage.findByIdAndDelete(id);

        if (!deletedPage) {
            return NextResponse.json({ success: false, message: "Page not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: "Page deleted successfully" });
    } catch (error) {
        console.error("Error deleting page:", error);
        return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
    }
}

