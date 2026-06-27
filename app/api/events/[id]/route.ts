import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Event from "@/models/Event";
import EventGallery from "@/models/EventGallery";

export async function DELETE(request: Request, { params }: any) {
    try {
        await connectDB();
        const { id } = await params;
        
        // Find the event to get the slug
        const event = await Event.findById(id);
        if (!event) {
            return NextResponse.json({ error: "Event not found" }, { status: 404 });
        }
        
        // Delete the event
        await Event.findByIdAndDelete(id);
        
        // Delete all associated gallery photos
        await EventGallery.deleteMany({ eventSlug: event.slug });
        
        return NextResponse.json({ message: "Event and associated photos deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting event:", error);
        return NextResponse.json({ error: "Failed to delete event" }, { status: 500 });
    }
}

export async function PUT(request: Request, { params }: any) {
    try {
        await connectDB();
        const { id } = await params;
        const body = await request.json();
        
        if (body.title && !body.slug) {
            body.slug = body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
        }

        const updatedEvent = await Event.findByIdAndUpdate(id, body, { new: true });
        return NextResponse.json(updatedEvent, { status: 200 });
    } catch (error) {
        console.error("Error updating event:", error);
        return NextResponse.json({ error: "Failed to update event" }, { status: 500 });
    }
}
