import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Review from "@/models/Review";

export async function GET() {
    try {
        await connectDB();
        const reviews = await Review.find().sort({ createdAt: -1 });
        return NextResponse.json(reviews);
    } catch (error) {
        console.error("Error fetching reviews:", error);
        return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        await connectDB();
        const body = await request.json();
        const newReview = await Review.create(body);
        return NextResponse.json(newReview, { status: 201 });
    } catch (error) {
        console.error("Error creating review:", error);
        return NextResponse.json({ error: "Failed to create review" }, { status: 500 });
    }
}
