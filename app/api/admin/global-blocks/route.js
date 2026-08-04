import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import GlobalBlock from "@/models/GlobalBlock";

export const dynamic = 'force-dynamic';

// GET all global blocks
export async function GET() {
    try {
        await connectDB();
        const blocks = await GlobalBlock.find().sort({ createdAt: -1 }).lean();
        return NextResponse.json({ success: true, blocks });
    } catch (error) {
        console.error("Error fetching global blocks:", error);
        return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
    }
}

// POST - create new global block
export async function POST(req) {
    try {
        await connectDB();
        const data = await req.json();

        if (!data.name) {
            return NextResponse.json({ success: false, message: "Name is required" }, { status: 400 });
        }

        const block = await GlobalBlock.create({
            name: data.name,
            targetCategory: data.targetCategory || "all",
            position: data.position || "bottom",
            blockData: data.blockData || {},
            isActive: data.isActive !== undefined ? data.isActive : true,
        });

        // Revalidate frontend cache
        await pingRevalidate();

        return NextResponse.json({ success: true, block });
    } catch (error) {
        console.error("Error creating global block:", error);
        return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
    }
}

// PUT - update existing global block
export async function PUT(req) {
    try {
        await connectDB();
        const data = await req.json();

        if (!data.id) {
            return NextResponse.json({ success: false, message: "ID is required" }, { status: 400 });
        }

        const updated = await GlobalBlock.findByIdAndUpdate(
            data.id,
            {
                name: data.name,
                targetCategory: data.targetCategory,
                position: data.position,
                blockData: data.blockData,
                isActive: data.isActive,
            },
            { new: true }
        );

        if (!updated) {
            return NextResponse.json({ success: false, message: "Block not found" }, { status: 404 });
        }

        // Revalidate frontend cache
        await pingRevalidate();

        return NextResponse.json({ success: true, block: updated });
    } catch (error) {
        console.error("Error updating global block:", error);
        return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
    }
}

// DELETE - delete a global block
export async function DELETE(req) {
    try {
        await connectDB();
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json({ success: false, message: "ID is required" }, { status: 400 });
        }

        await GlobalBlock.findByIdAndDelete(id);

        // Revalidate frontend cache
        await pingRevalidate();

        return NextResponse.json({ success: true, message: "Block deleted" });
    } catch (error) {
        console.error("Error deleting global block:", error);
        return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
    }
}

async function pingRevalidate() {
    const mainSiteUrl = process.env.MAIN_SITE_URL || "http://localhost:3000";
    const revalSecret = process.env.REVALIDATION_SECRET;
    try {
        await fetch(`${mainSiteUrl}/api/revalidate-pages`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                ...(revalSecret ? { "x-revalidate-secret": revalSecret } : {}),
            },
            body: JSON.stringify({ tag: "global-blocks" }),
        });
    } catch (e) {
        console.error("Revalidation ping failed:", e);
    }
}
