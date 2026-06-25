import CreatePortfolioForm from "@/components/admin/CreatePortfolioForm";
import Portfolio from "@/models/Portfolio";
import { connectDB } from "@/lib/mongodb";
import { notFound } from "next/navigation";

export const metadata = {
    title: "Edit Project | Admin",
};

export default async function EditPortfolioPage({ params }) {
    await connectDB();
    const { id } = await params;
    
    let project = null;
    try {
        const rawProject = await Portfolio.findById(id).lean();
        if (rawProject) {
            project = {
                ...rawProject,
                _id: rawProject._id.toString()
            };
        }
    } catch (e) {
        console.error(e);
    }

    if (!project) return notFound();

    return <CreatePortfolioForm initialData={project} />;
}
