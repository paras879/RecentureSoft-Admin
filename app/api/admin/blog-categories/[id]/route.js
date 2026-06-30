import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import BlogCategory from "@/models/BlogCategory";

export async function PUT(req, { params }) {
    try {
        await connectDB();
        const id = (await params).id;
        const { name } = await req.json();

        if (!name || typeof name !== 'string' || !name.trim()) {
            return NextResponse.json({ error: "Category name is required" }, { status: 400 });
        }

        const trimmedName = name.trim();
        
        // Check if another category with the same name exists
        const existing = await BlogCategory.findOne({ 
            name: new RegExp(`^${trimmedName}$`, 'i'),
            _id: { $ne: id }
        });

        if (existing) {
            return NextResponse.json({ error: "Another category with this name already exists" }, { status: 400 });
        }

        const cat = await BlogCategory.findByIdAndUpdate(id, { name: trimmedName }, { new: true });
        if (!cat) {
            return NextResponse.json({ error: "Category not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, category: cat });
    } catch (e) {
        console.error("Error updating category:", e);
        return NextResponse.json({ error: "Failed to update category" }, { status: 500 });
    }
}

export async function DELETE(req, { params }) {
    try {
        await connectDB();
        const id = (await params).id;

        const deletedCat = await BlogCategory.findByIdAndDelete(id);
        if (!deletedCat) {
            return NextResponse.json({ error: "Category not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true });
    } catch (e) {
        console.error("Error deleting category:", e);
        return NextResponse.json({ error: "Failed to delete category" }, { status: 500 });
    }
}
