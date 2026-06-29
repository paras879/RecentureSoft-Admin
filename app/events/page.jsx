import Navbar from "@/components/Navbar";
import PremiumFooter from "@/components/PremiumFooter";
import CinematicEvents from "@/components/events/CinematicEvents";
import { connectDB } from "@/lib/mongodb";
import Event from "@/models/Event";
import EventGallery from "@/models/EventGallery";
import { resolveImagePath } from "@/lib/imageHelper";

export const metadata = {
  title: "Events & Culture | RecentureSoft",
  description: "Experience the passion, innovation, and global collaboration that drives our engineering teams.",
};

export const dynamic = "force-dynamic";

export default async function EventsPage() {
    let serializedEvents = [];
    
    try {
        await connectDB();
        const events = await Event.find({}).lean();
        
        serializedEvents = await Promise.all(
            events.map(async (event) => {
                const photoCount = await EventGallery.countDocuments({ eventSlug: new RegExp(`^${event.slug}$`, "i") });
                return {
                    _id: event._id.toString(),
                    title: event.title || "",
                    slug: event.slug || "",
                    date: event.date || "",
                    location: event.location || "",
                    heroImage: resolveImagePath(event.heroImage || ""),
                    featured: !!event.featured,
                    photoCount: photoCount || 0,
                };
            })
        );
    } catch (error) {
        console.error("Error fetching events from MongoDB:", error);
    }

    return (
        <main className="bg-slate-50 dark:bg-[#020617] min-h-screen">
            <Navbar />
            <CinematicEvents events={serializedEvents} />
            <PremiumFooter />
        </main>
    );
}

