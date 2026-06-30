import { connectDB } from "@/lib/mongodb";
import Portfolio from "@/models/Portfolio";
import AdminDataTable from "@/components/admin/AdminDataTable";
import Link from "next/link";
import { Plus } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata = {
    title: "Manage Portfolio | Admin",
};

export default async function PortfolioCMSPage() {
    await connectDB();
    
    const records = await Portfolio.find().sort({ createdAt: -1 }).lean();

    const data = records.map(r => ({
        _id: r._id.toString(),
        title: r.title,
        slug: r.slug,
        category: r.category || "Web Development",
        projectUrl: r.projectUrl || "",
        technologies: r.technologies || [],
        description: r.description,
        image: r.image,
        images: r.images,
        date: new Date(r.createdAt).toLocaleDateString("en-US", {
            year: 'numeric', month: 'short', day: 'numeric'
        }),
    }));

    return (
        <div className="pb-10 w-full flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Portfolio Projects</h1>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">Manage your showcased projects</p>
                </div>
                
                <Link 
                    href="/admin/content/portfolio/create"
                    className="bg-cyan-600 hover:bg-cyan-700 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-colors flex items-center gap-2 shadow-sm"
                >
                    <Plus className="w-4 h-4" /> Add Project
                </Link>
            </div>

            <AdminDataTable 
                title="" 
                data={data} 
                type="portfolio" 
            />
        </div>
    );
}
