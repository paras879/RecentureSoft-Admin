import { connectDB } from "@/lib/mongodb";
import ProjectInquiry from "@/models/ProjectInquiry";
import AdminDataTable from "@/components/admin/AdminDataTable";
import DashboardChart from "@/components/admin/DashboardChart";
import { generateLast7DaysChartData } from "@/lib/chartUtils";

export const dynamic = "force-dynamic";

export const metadata = {
    title: "Project Inquiries | Admin",
};

export default async function ProjectsPage() {
    await connectDB();
    
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
    sevenDaysAgo.setHours(0, 0, 0, 0);

    const [records, recentProjectsForChart] = await Promise.all([
        ProjectInquiry.find().sort({ createdAt: -1 }).lean(),
        ProjectInquiry.find({ createdAt: { $gte: sevenDaysAgo } }).select('createdAt').lean()
    ]);

    const chartData = generateLast7DaysChartData(recentProjectsForChart, "count");

    const data = records.map(r => ({
        _id: r._id.toString(),
        name: r.name,
        email: r.email,
        projectType: r.projectType,
        projectDetails: r.projectDetails || r.message || "",
        message: r.projectDetails || r.message || "",
        status: r.status,
        date: new Date(r.createdAt).toLocaleDateString("en-US", {
            timeZone: 'Asia/Kolkata',
            year: 'numeric', month: 'short', day: 'numeric',
            hour: '2-digit', minute: '2-digit'
        }),
    }));

    return (
        <div className="pb-10 flex flex-col gap-6">
            <DashboardChart 
                data={chartData} 
                title="Project Inquiries" 
                description="Project requests received over the last 7 days" 
                dataKey="count" 
                dataName="Projects" 
                color="#06b6d4" 
            />
            <AdminDataTable 
                title="Project Inquiries" 
                data={data} 
                type="project" 
            />
        </div>
    );
}
