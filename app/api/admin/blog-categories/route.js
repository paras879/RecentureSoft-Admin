import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import BlogCategory from "@/models/BlogCategory";

export async function GET() {
    try {
        await connectDB();
        const cats = await BlogCategory.find().sort({ createdAt: 1 }).lean();
        return NextResponse.json(cats);
    } catch (e) {
        return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        await connectDB();
        const { name } = await req.json();
        if (!name || typeof name !== 'string' || !name.trim()) {
            return NextResponse.json({ error: "Category name is required" }, { status: 400 });
        }
        
        const trimmedName = name.trim();
        // Check if exists
        const existing = await BlogCategory.findOne({ name: new RegExp(`^${trimmedName}$`, 'i') });
        if (existing) {
            return NextResponse.json({ error: "Category already exists" }, { status: 400 });
        }
        
        const cat = await BlogCategory.create({ name: trimmedName });
        return NextResponse.json({ success: true, category: cat });
    } catch (e) {
        console.error("Error creating blog category:", e);
        return NextResponse.json({ error: "Failed to create category" }, { status: 500 });
    }
}
