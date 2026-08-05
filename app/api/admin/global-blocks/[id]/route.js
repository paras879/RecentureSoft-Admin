import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import mongoose from "mongoose";
import { ObjectId } from "mongodb";
import { revalidateTag } from "next/cache";

// GET single block by id
export async function GET(req, { params }) {
    try {
        await connectDB();
        const db = mongoose.connection;
        const { id } = await params;
        const block = await db.collection("globalblocks").findOne({ _id: new ObjectId(id) });
        if (!block) return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });
        return NextResponse.json({ success: true, block });
    } catch (err) {
        return NextResponse.json({ success: false, error: err.message }, { status: 500 });
    }
}

// PUT update a block
export async function PUT(req, { params }) {
    try {
        await connectDB();
        const db = mongoose.connection;
        const { id } = await params;
        const body = await req.json();

        const update = {
            $set: {
                ...body,
                updatedAt: new Date(),
            },
        };

        await db.collection("globalblocks").updateOne({ _id: new ObjectId(id) }, update);
        revalidateTag("global-blocks");

        return NextResponse.json({ success: true });
    } catch (err) {
        return NextResponse.json({ success: false, error: err.message }, { status: 500 });
    }
}

// DELETE a block
export async function DELETE(req, { params }) {
    try {
        await connectDB();
        const db = mongoose.connection;
        const { id } = await params;

        await db.collection("globalblocks").deleteOne({ _id: new ObjectId(id) });
        revalidateTag("global-blocks");

        return NextResponse.json({ success: true });
    } catch (err) {
        return NextResponse.json({ success: false, error: err.message }, { status: 500 });
    }
}
