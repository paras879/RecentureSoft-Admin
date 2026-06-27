import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import EventGallery from "@/models/EventGallery";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const eventSlug = searchParams.get('eventSlug');
        
        await connectDB();
        
        let query = {};
        if (eventSlug) {
            query = { eventSlug };
        }
        
        const gallery = await EventGallery.find(query).sort({ year: -1, order: 1, _id: -1 });
        return NextResponse.json(gallery);
    } catch (error) {
        console.error("Error fetching event gallery:", error);
        return NextResponse.json({ error: "Failed to fetch event gallery" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        await connectDB();
        const body = await request.json();
        
        // Ensure year is a number
        if (body.year) {
            body.year = parseInt(body.year);
        }

        const newPhoto = await EventGallery.create(body);
        return NextResponse.json(newPhoto, { status: 201 });
    } catch (error) {
        console.error("Error adding gallery photo:", error);
        return NextResponse.json({ error: "Failed to add gallery photo" }, { status: 500 });
    }
}
