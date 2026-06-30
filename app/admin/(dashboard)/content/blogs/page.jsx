import { connectDB } from "@/lib/mongodb";
import Blog from "@/models/Blog";
import AdminDataTable from "@/components/admin/AdminDataTable";
import Link from "next/link";
import { Plus } from "lucide-react";
import DashboardChart from "@/components/admin/DashboardChart";
import { generateLast7DaysChartData } from "@/lib/chartUtils";
import AuthGuard from "@/components/admin/AuthGuard";
import PermissionGuard from "@/components/admin/PermissionGuard";

export const dynamic = "force-dynamic";

export const metadata = {
    title: "Manage Blogs | Admin",
};

export default async function BlogsPage() {
    await connectDB();
    
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
    sevenDaysAgo.setHours(0, 0, 0, 0);

    const [records, recentBlogsForChart] = await Promise.all([
        Blog.find().sort({ createdAt: -1 }).lean(),
        Blog.find({ createdAt: { $gte: sevenDaysAgo } }).select('createdAt').lean()
    ]);

    const chartData = generateLast7DaysChartData(recentBlogsForChart, "count");

    const data = records.map(r => ({
        _id: r._id.toString(),
        title: r.title,
        slug: r.slug,
        category: r.category,
        tags: r.tags || [],
        views: r.views || 0,
        published: r.published,
        date: new Date(r.createdAt || Date.now()).toLocaleDateString("en-US", {
            timeZone: 'Asia/Kolkata',
            year: 'numeric', month: 'short', day: 'numeric',
            hour: '2-digit', minute: '2-digit'
        }),
    }));

    return (
        <AuthGuard permissionKey="blogs_view_all">
            <div className="pb-10 w-full flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Blogs & Articles</h1>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">Manage your published content</p>
                </div>
                
                <PermissionGuard permissionKey="blogs_create">
                    <Link 
                        href="/admin/content/blogs/create"
                        className="bg-cyan-600 hover:bg-cyan-700 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-colors flex items-center gap-2 shadow-sm"
                    >
                        <Plus className="w-4 h-4" /> Create New Blog
                    </Link>
                </PermissionGuard>
            </div>

            <DashboardChart 
                data={chartData} 
                title="Blog Publications" 
                description="Blogs published over the last 7 days" 
                dataKey="count" 
                dataName="Blogs" 
                color="#f59e0b" 
            />

            <AdminDataTable 
                title="" 
                data={data} 
                type="blog" 
            />
        </div>
        </AuthGuard>
    );
}
