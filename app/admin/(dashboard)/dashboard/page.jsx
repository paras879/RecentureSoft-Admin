import { connectDB } from "@/lib/mongodb";
import Contact from "@/models/Contact";
import ProjectInquiry from "@/models/ProjectInquiry";
import MeetingRequest from "@/models/MeetingRequest";
import Blog from "@/models/Blog";

import { ArrowUpRight, MessageSquare, PlusCircle, Download, Clock } from "lucide-react";
import DashboardStats from "@/components/admin/DashboardStats";
import DashboardChart from "@/components/admin/DashboardChart";
import Link from "next/link";

// Helper to format date
const formatDate = (date) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
};

// Set to force dynamic rendering so stats are always up to date
export const dynamic = "force-dynamic";

export const metadata = {
    title: "Admin Dashboard | RecentureSoft",
    description: "Overview of agency statistics.",
};

export default async function DashboardPage() {
    await connectDB();

    // Date calculation for the chart (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
    sevenDaysAgo.setHours(0, 0, 0, 0);

    // Fetch live counts and recent leads from MongoDB in parallel
    const [projectCount, meetingCount, contactCount, blogCount, recentProjects, recentLeadsForChart] = await Promise.all([
        ProjectInquiry.countDocuments(),
        MeetingRequest.countDocuments(),
        Contact.countDocuments(),
        Blog.countDocuments(),
        ProjectInquiry.find().sort({ createdAt: -1 }).limit(5).lean(),
        ProjectInquiry.find({ createdAt: { $gte: sevenDaysAgo } }).select('createdAt').lean(),
    ]);

    // Aggregate data for the chart (starting from today going backwards 7 days)
    const leadsByDate = {};
    const chartData = [];
    
    for (let i = 0; i < 7; i++) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        
        let label = d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
        if (i === 0) label = "Today";
        if (i === 1) label = "Yesterday";
        
        // Use the standard date string as the key to map DB records
        const dateStr = d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
        leadsByDate[dateStr] = { label, leads: 0 };
    }

    recentLeadsForChart.forEach(lead => {
        const dateStr = new Date(lead.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" });
        if (leadsByDate[dateStr]) {
            leadsByDate[dateStr].leads++;
        }
    });

    // Build the final array chronologically (from 6 days ago to Today)
    for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        const dateStr = d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
        
        if (leadsByDate[dateStr]) {
            chartData.push({
                date: leadsByDate[dateStr].label,
                leads: leadsByDate[dateStr].leads
            });
        }
    }

    const stats = [
        { title: "Total Project Leads", value: projectCount, iconName: "MessageSquare", color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-100 dark:bg-blue-500/10" },
        { title: "Meetings Scheduled", value: meetingCount, iconName: "CalendarCheck", color: "text-purple-600 dark:text-purple-400", bg: "bg-purple-100 dark:bg-purple-500/10" },
        { title: "General Inquiries", value: contactCount, iconName: "Users", color: "text-cyan-600 dark:text-cyan-400", bg: "bg-cyan-100 dark:bg-cyan-500/10" },
        { title: "Published Blogs", value: blogCount, iconName: "FileText", color: "text-orange-600 dark:text-orange-400", bg: "bg-orange-100 dark:bg-orange-500/10" },
    ];

    return (
        <div className="w-full max-w-6xl mx-auto flex flex-col gap-8 pb-12">
            <div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Welcome Back, Admin</h1>
                <p className="text-slate-500 dark:text-slate-400">Here is what's happening with your agency today. Real-time data connected.</p>
            </div>

            {/* We extract the framer-motion UI into a Client Component because this is a Server Component */}
            <DashboardStats stats={stats} />

            {/* Leads Analytics Chart */}
            <DashboardChart 
                data={chartData} 
                dataKey="leads" 
                dataName="Project Leads"
                color="#0ea5e9" 
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-4">
                {/* Recent Project Leads Table (Takes 2 columns) */}
                <div className="lg:col-span-2 bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden shadow-sm">
                    <div className="p-6 border-b border-slate-200 dark:border-white/10 flex items-center justify-between">
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                            <Clock className="w-5 h-5 text-blue-500" />
                            Recent Project Leads
                        </h2>
                        <Link href="/admin/projects" className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1">
                            View All <ArrowUpRight className="w-4 h-4" />
                        </Link>
                    </div>
                    
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-slate-600 dark:text-slate-400">
                            <thead className="bg-slate-50 dark:bg-white/5 text-slate-500 dark:text-slate-300 border-b border-slate-200 dark:border-white/10">
                                <tr>
                                    <th className="px-6 py-4 font-medium">Name</th>
                                    <th className="px-6 py-4 font-medium">Project Type</th>
                                    <th className="px-6 py-4 font-medium">Date</th>
                                    <th className="px-6 py-4 font-medium">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200 dark:divide-white/10">
                                {recentProjects.map((project) => (
                                    <tr key={project._id.toString()} className="hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors">
                                        <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">
                                            {project.name}
                                            <div className="text-xs text-slate-500 font-normal">{project.email}</div>
                                        </td>
                                        <td className="px-6 py-4">{project.projectType}</td>
                                        <td className="px-6 py-4">{formatDate(project.createdAt)}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                                                project.status === 'new' 
                                                ? 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400'
                                                : project.status === 'contacted'
                                                ? 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400'
                                                : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400'
                                            }`}>
                                                {project.status ? project.status.charAt(0).toUpperCase() + project.status.slice(1) : 'New'}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                                {recentProjects.length === 0 && (
                                    <tr>
                                        <td colSpan="4" className="px-6 py-8 text-center text-slate-500">
                                            No recent leads found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Quick Actions Panel */}
                <div className="bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-sm h-fit">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Quick Actions</h2>
                    <div className="flex flex-col gap-3">
                        <Link href="/admin/blogs/create" className="flex items-center gap-3 p-4 rounded-xl bg-blue-50 hover:bg-blue-100 dark:bg-blue-500/10 dark:hover:bg-blue-500/20 transition-colors border border-blue-100 dark:border-blue-500/20 group">
                            <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                                <PlusCircle className="w-5 h-5" />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-semibold text-blue-900 dark:text-blue-300">Write New Blog</h3>
                                <p className="text-xs text-blue-700/70 dark:text-blue-400/70">Create and publish content</p>
                            </div>
                            <ArrowUpRight className="w-5 h-5 text-blue-500 opacity-50 group-hover:opacity-100" />
                        </Link>
                        
                        <Link href="/admin/projects" className="flex items-center gap-3 p-4 rounded-xl bg-purple-50 hover:bg-purple-100 dark:bg-purple-500/10 dark:hover:bg-purple-500/20 transition-colors border border-purple-100 dark:border-purple-500/20 group">
                            <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-500/20 flex items-center justify-center text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform">
                                <MessageSquare className="w-5 h-5" />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-semibold text-purple-900 dark:text-purple-300">View All Leads</h3>
                                <p className="text-xs text-purple-700/70 dark:text-purple-400/70">Manage project inquiries</p>
                            </div>
                            <ArrowUpRight className="w-5 h-5 text-purple-500 opacity-50 group-hover:opacity-100" />
                        </Link>

                        <a href="/api/admin/export" download="project_leads.csv" className="flex w-full items-center gap-3 p-4 rounded-xl bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-500/10 dark:hover:bg-emerald-500/20 transition-colors border border-emerald-100 dark:border-emerald-500/20 group text-left">
                            <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform">
                                <Download className="w-5 h-5" />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-semibold text-emerald-900 dark:text-emerald-300">Export Data</h3>
                                <p className="text-xs text-emerald-700/70 dark:text-emerald-400/70">Download leads as CSV</p>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
