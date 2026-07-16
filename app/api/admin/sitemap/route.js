import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import SitemapEntry from "@/models/SitemapEntry";
import { syncSitemap } from "@/lib/sitemapSync";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        await connectDB();
        const entries = await SitemapEntry.find({ status: "active" })
            .sort({ section: 1, priority: -1, name: 1 })
            .lean();

        const grouped = {
            information: entries.filter(e => e.section === "information"),
            locations: entries.filter(e => e.section === "locations"),
            legal: entries.filter(e => e.section === "legal"),
        };

        return NextResponse.json({ success: true, ...grouped });
    } catch (e) {
        console.error("Sitemap GET Error:", e);
        return NextResponse.json({ success: false, error: "Failed to fetch sitemap" }, { status: 500 });
    }
}

export async function POST() {
    try {
        const result = await syncSitemap();
        return NextResponse.json(result);
    } catch (e) {
        console.error("Sitemap SYNC Error:", e);
        return NextResponse.json({ success: false, error: "Failed to sync sitemap" }, { status: 500 });
    }
}
