import ManageEventGallery from "@/components/admin/ManageEventGallery";
import { connectDB } from "@/lib/mongodb";
import Event from "@/models/Event";
import { notFound } from "next/navigation";

export const metadata = {
    title: "Manage Event Gallery | Admin Panel",
};

export default async function ManageEventGalleryPage({ params }) {
    const { id } = await params; // id is actually the slug based on our routing, but let's assume it's slug. Wait, in page list it's /events/[slug]
    
    await connectDB();
    const event = await Event.findOne({ slug: id });
    
    if (!event) {
        notFound();
    }

    return (
        <div className="w-full max-w-6xl mx-auto flex flex-col gap-8 pb-12">
            <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white capitalize">
                    {event.title} - Gallery
                </h1>
                <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Upload and organize photos for this event by year.</p>
            </div>

            <ManageEventGallery eventSlug={event.slug} />
        </div>
    );
}
