import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Review from "@/models/Review";

export async function DELETE(request: Request, { params }: any) {
    try {
        await connectDB();
        const { id } = await params;
        await Review.findByIdAndDelete(id);
        return NextResponse.json({ message: "Review deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting review:", error);
        return NextResponse.json({ error: "Failed to delete review" }, { status: 500 });
    }
}

export async function PUT(request: Request, { params }: any) {
    try {
        await connectDB();
        const { id } = await params;
        const body = await request.json();
        const updatedReview = await Review.findByIdAndUpdate(id, body, { new: true });
        return NextResponse.json(updatedReview, { status: 200 });
    } catch (error) {
        console.error("Error updating review:", error);
        return NextResponse.json({ error: "Failed to update review" }, { status: 500 });
    }
}
