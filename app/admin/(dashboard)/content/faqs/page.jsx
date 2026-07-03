import { connectDB } from "@/lib/mongodb";
import FAQ from "@/models/FAQ";
import AdminDataTable from "@/components/admin/AdminDataTable";
import Link from "next/link";
import { Plus } from "lucide-react";
import AuthGuard from "@/components/admin/AuthGuard";
import PermissionGuard from "@/components/admin/PermissionGuard";

export const dynamic = "force-dynamic";

export const metadata = {
    title: "Manage FAQs | Admin",
};

export default async function FAQsPage() {
    await connectDB();
    
    const records = await FAQ.find().sort({ order: 1, createdAt: -1 }).lean();

    const data = records.map(r => ({
        _id: r._id.toString(),
        question: r.question,
        answer: r.answer,
        page: r.page || "home",
        order: r.order || 0,
        isActive: r.isActive !== false,
    }));

    return (
        <AuthGuard permissionKey="faqs">
            <div className="pb-10 w-full flex flex-col gap-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Frequently Asked Questions</h1>
                        <p className="text-slate-500 dark:text-slate-400 text-sm">Manage FAQs shown on the website</p>
                    </div>
                    
                    <PermissionGuard module="faqs" action="manage">
                        <Link 
                            href="/admin/content/faqs/create"
                            className="bg-cyan-600 hover:bg-cyan-700 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-colors flex items-center gap-2 shadow-sm"
                        >
                            <Plus className="w-4 h-4" /> Add New FAQ
                        </Link>
                    </PermissionGuard>
                </div>

                <AdminDataTable 
                    title="" 
                    data={data} 
                    type="faq" 
                />
            </div>
        </AuthGuard>
    );
}
