import { connectDB } from "@/lib/mongodb";
import JobOpening from "@/models/JobOpening";
import CreateJobForm from "@/components/admin/CreateJobForm";
import { notFound } from "next/navigation";

export const metadata = {
    title: "Edit Job | Admin",
};

export default async function EditJobPage({ params }) {
    await connectDB();
    
    const { id } = await params;
    
    let record = null;
    try {
        record = await JobOpening.findById(id).lean();
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
        department: record.department || "",
        location: record.location || "",
        experience: record.experience || "",
        jobType: record.jobType || "Full Time",
        description: record.description || "",
        status: record.status !== false,
    };

    return <CreateJobForm initialData={data} />;
}
