import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import SiteSettings from "@/models/SiteSettings";

export async function GET() {
    try {
        await connectDB();
        const settings = await SiteSettings.findOne({ type: "global" }).lean();
        return NextResponse.json({ success: true, settings: settings || {} });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Failed to fetch settings" }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        await connectDB();
        const data = await req.json();
        
        let settings = await SiteSettings.findOne({ type: "global" });
        if (!settings) {
            settings = new SiteSettings({ type: "global" });
        }
        
        if (data.logoUrl) settings.logoUrl = data.logoUrl;
        if (data.email) settings.email = data.email;
        if (data.phone) settings.phone = data.phone;
        if (data.address) settings.address = data.address;
        
        if (data.socialLinks) {
            settings.socialLinks = {
                ...settings.socialLinks,
                ...data.socialLinks
            };
        }
        
        await settings.save();
        
        return NextResponse.json({ success: true, settings });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Failed to update settings" }, { status: 500 });
    }
}
