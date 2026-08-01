import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import WebPage from "@/models/WebPage";

export async function GET() {
    try {
        await connectDB();

        const allOriginalMenu = [
            {
                title: "Software Development",
                items: [
                    { name: "CRM", href: "/crm" },
                    { name: "CMS", href: "/cms" },
                    { name: "Salesforce", href: "/salesforce" },
                    { name: "Custom Development", href: "/custom-development" },
                ]
            },
            {
                title: "Web Development",
                items: [
                    { name: "Web Design", href: "/web-design" },
                    { name: "PHP Development", href: "/php-development" },
                ]
            },
            {
                title: "E-Commerce",
                items: [
                    { name: "React.js", href: "/react" },
                    { name: "Next.js", href: "/next-js" },
                    { name: "OpenCart", href: "/opencart-development" },
                    { name: "Laravel", href: "/laravel-development" }
                ]
            },
            {
                title: "Mobile App Development",
                items: [
                    { name: "iPhone Apps", href: "/iphone-apps-development" },
                    { name: "iPad Apps", href: "/ipad-app-development" },
                    { name: "Android Apps", href: "/android-application-development" },
                ]
            },
            {
                title: "Technology Solution",
                items: [
                    { name: "Node JS", href: "/node-js" },
                    { name: "React Native", href: "/react-native" },
                    { name: "Flutter", href: "/flutter" },
                    { name: "Python Development", href: "/python-development" },
                    { name: "JavaScript Development", href: "/javascript-development" },
                ]
            },
            {
                title: "Digital Marketing",
                items: [
                    { name: "SEO Service", href: "/seo-service" },
                    { name: "SEO Package", href: "/seo-package" },
                    { name: "Social Networking", href: "/social-networking" },
                    { name: "Content Marketing", href: "/content-writing" },
                    { name: "AI SEO", href: "/ai-seo" },
                ]
            },
            {
                title: "AI Development Solutions",
                items: [
                    { name: "Generative AI", href: "/generative-ai" },
                    { name: "AI Consulting Services", href: "/ai-consulting-services" },
                    { name: "AI Agent Development", href: "/ai-agent-development" },
                    { name: "AI Chatbot Development", href: "/ai-chatbot-development" },
                    { name: "RAG Development", href: "/rag-development" },
                ]
            }
        ];

        // Ensure all these exist with correct category/subcategory
        for (const category of allOriginalMenu) {
            for (const item of category.items) {
                await WebPage.findOneAndUpdate(
                    { path: item.href },
                    { 
                        $set: { 
                            name: item.name, 
                            category: "Solutions", 
                            subcategory: category.title,
                            status: "active" 
                        }
                    },
                    { upsert: true }
                );
            }
        }

        // Ensure deleted pages stay deleted
        await WebPage.deleteMany({
            path: { $in: [
                "/magento-development", 
                "/ebay-store-management", 
                "/amazon-store-management", 
                "/wordpress-development-customization"
            ]}
        });

        return NextResponse.json({ success: true, message: "Database perfectly synchronized with entire original mega menu!" });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message });
    }
}
