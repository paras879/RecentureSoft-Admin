import { connectDB } from "@/lib/mongodb";
import JobApplication from "@/models/JobApplication";
import AdminDataTable from "@/components/admin/AdminDataTable";

export const dynamic = "force-dynamic";

export const metadata = {
    title: "Job Applications | Admin",
};

export default async function ApplicationsPage() {
    await connectDB();
    
    const records = await JobApplication.find().sort({ createdAt: -1 }).lean();

    const data = records.map(r => ({
        _id: r._id.toString(),
        name: r.name,
        email: r.email,
        phone: r.phone,
        city: r.city,
        applyFor: r.applyFor,
        experience: r.experience || "N/A",
        message: r.message || "",
        resumeUrl: r.resumeUrl,
        status: r.status,
        createdAt: r.createdAt ? r.createdAt.toISOString() : new Date().toISOString(),
    }));

    return (
        <div className="pb-10 w-full flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Job Applications</h1>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">Review applicants who applied on the careers page</p>
                </div>
            </div>

            <AdminDataTable 
                title="" 
                data={data} 
                type="application" 
            />
        </div>
    );
}
