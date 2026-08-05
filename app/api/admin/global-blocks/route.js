import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import mongoose from "mongoose";
import { revalidateTag } from "next/cache";

// GET all global blocks
export async function GET() {
    try {
        await connectDB();
        const db = mongoose.connection;
        const blocks = await db.collection("globalblocks").find({}).sort({ createdAt: -1 }).toArray();
        return NextResponse.json({ success: true, blocks });
    } catch (err) {
        console.error("GET /api/admin/global-blocks error:", err);
        return NextResponse.json({ success: false, error: err.message }, { status: 500 });
    }
}

// POST create a new global block
export async function POST(req) {
    try {
        await connectDB();
        const db = mongoose.connection;
        const body = await req.json();

        const { name, targetCategory, position, blockData, isActive } = body;
        if (!name) {
            return NextResponse.json({ success: false, error: "Name is required" }, { status: 400 });
        }

        const doc = {
            name,
            targetCategory: targetCategory || "all",
            position: position || "bottom",
            blockData: blockData || { blocks: [] },
            isActive: isActive !== false,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const result = await db.collection("globalblocks").insertOne(doc);
        revalidateTag("global-blocks");

        return NextResponse.json({ success: true, id: result.insertedId });
    } catch (err) {
        console.error("POST /api/admin/global-blocks error:", err);
        return NextResponse.json({ success: false, error: err.message }, { status: 500 });
    }
}
