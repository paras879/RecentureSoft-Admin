import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import WebPage from "@/models/WebPage";

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        await connectDB();

        const pages = await WebPage.find({ status: { $ne: "deleted" } }).sort({ createdAt: 1 }).lean();

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
                    path: newPage.path,
                }),
            });
        } catch (revalErr) {
            console.warn("[website-pages] Revalidation ping failed on create:", revalErr.message);
        }

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

        const deletedPage = await WebPage.findByIdAndUpdate(id, { status: "deleted" }, { new: true });

        if (!deletedPage) {
            return NextResponse.json({ success: false, message: "Page not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: "Page deleted successfully" });
    } catch (error) {
        console.error("Error deleting page:", error);
        return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
    }
}

