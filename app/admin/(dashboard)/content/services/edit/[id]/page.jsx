import { connectDB } from "@/lib/mongodb";
import Service from "@/models/Service";
import CreateServiceForm from "@/components/admin/CreateServiceForm";
import { notFound } from "next/navigation";

export const metadata = {
    title: "Edit Service | Admin",
};

export default async function EditServicePage({ params }) {
    await connectDB();
    
    const { id } = await params;
    
    let record = null;
    try {
        record = await Service.findById(id).lean();
    } catch (error) {
        console.error(error);
    }
    
    if (!record) {
        notFound();
    }

    const data = {
        _id: record._id.toString(),
        title: record.title,
        slug: record.slug,
        shortDescription: record.shortDescription || "",
        description: record.description || "",
        image: record.image || "",
        images: record.images && record.images.length > 0 ? record.images : ["", ""],
        icon: record.icon || "",
        features: record.features || [],
        category: record.category || "Enterprise Engineering",
        colSpan: record.colSpan || "lg:col-span-6",
        color: record.color || "cyan",
        accent: record.accent || "from-cyan-500/20 to-blue-500/20",
        scene: record.scene || "SoftwareDevGraphic",
        status: record.status !== false,
    };

    return <CreateServiceForm initialData={data} />;
}
