import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import SitemapEntry from "@/models/SitemapEntry";

export async function PUT(req, { params }) {
    try {
        const { id } = await params;
        const body = await req.json();

        await connectDB();

        const updateData = {};
        if (body.priority !== undefined) updateData.priority = body.priority;
        if (body.changeFrequency !== undefined) updateData.changeFrequency = body.changeFrequency;
        if (body.status !== undefined) updateData.status = body.status;

        const entry = await SitemapEntry.findByIdAndUpdate(id, updateData, { new: true }).lean();

        if (!entry) {
            return NextResponse.json({ success: false, error: "Entry not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, entry });
    } catch (e) {
        console.error("Sitemap PUT Error:", e);
        return NextResponse.json({ success: false, error: "Failed to update sitemap entry" }, { status: 500 });
    }
}

export async function DELETE(req, { params }) {
    try {
        const { id } = await params;

        await connectDB();

        const entry = await SitemapEntry.findByIdAndUpdate(
            id,
            { status: "inactive" },
            { new: true }
        ).lean();

        if (!entry) {
            return NextResponse.json({ success: false, error: "Entry not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, entry });
    } catch (e) {
        console.error("Sitemap DELETE Error:", e);
        return NextResponse.json({ success: false, error: "Failed to delete sitemap entry" }, { status: 500 });
    }
}
