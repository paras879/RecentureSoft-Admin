import { connectDB } from "@/lib/mongodb";
import Service from "@/models/Service";
import AdminDataTable from "@/components/admin/AdminDataTable";
import Link from "next/link";
import { Plus } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata = {
    title: "Manage Services | Admin",
};

export default async function ServicesCMSPage() {
    await connectDB();
    
    const records = await Service.find().sort({ createdAt: -1 }).lean();

    const data = records.map(r => ({
        _id: r._id.toString(),
        title: r.title,
        slug: r.slug,
        status: r.status,
        features: r.features || [],
        category: r.category,
        shortDescription: r.shortDescription,
        description: r.description,
        date: new Date(r.createdAt).toLocaleDateString("en-US", {
            year: 'numeric', month: 'short', day: 'numeric'
        }),
    }));

    return (
        <div className="pb-10 w-full flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Services</h1>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">Manage your company services</p>
                </div>
                
                <Link 
                    href="/admin/content/services/create"
                    className="bg-cyan-600 hover:bg-cyan-700 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-colors flex items-center gap-2 shadow-sm"
                >
                    <Plus className="w-4 h-4" /> Add Service
                </Link>
            </div>

            <AdminDataTable 
                title="" 
                data={data} 
                type="service" 
            />
        </div>
    );
}
