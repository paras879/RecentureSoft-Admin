import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Event from "@/models/Event";
import EventGallery from "@/models/EventGallery";

export async function GET() {
    try {
        await connectDB();
        const events = await Event.find().sort({ _id: -1 });
        
        const eventsWithCount = await Promise.all(events.map(async (event) => {
            const gallery = await EventGallery.find({ eventSlug: event.slug }).sort({ order: 1 });
            return {
                ...event.toObject(),
                photoCount: gallery.length,
                galleryPhotos: gallery.map(g => g.image)
            };
        }));
        
        return NextResponse.json(eventsWithCount);
    } catch (error) {
        console.error("Error fetching events:", error);
        return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        await connectDB();
        const body = await request.json();
        
        // Generate slug if not provided
        if (!body.slug && body.title) {
            body.slug = body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
        }

        const newEvent = await Event.create(body);
        return NextResponse.json(newEvent, { status: 201 });
    } catch (error) {
        console.error("Error creating event:", error);
        return NextResponse.json({ error: "Failed to create event" }, { status: 500 });
    }
}
