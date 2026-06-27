import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import EventGallery from "@/models/EventGallery";

export async function DELETE(request: Request, { params }: any) {
    try {
        await connectDB();
        const { id } = await params;
        
        await EventGallery.findByIdAndDelete(id);
        
        return NextResponse.json({ message: "Photo deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting gallery photo:", error);
        return NextResponse.json({ error: "Failed to delete photo" }, { status: 500 });
    }
}
