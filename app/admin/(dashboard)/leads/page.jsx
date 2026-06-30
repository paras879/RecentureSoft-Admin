import { connectDB } from "@/lib/mongodb";
import Contact from "@/models/Contact";
import AdminDataTable from "@/components/admin/AdminDataTable";
import DashboardChart from "@/components/admin/DashboardChart";
import { generateLast7DaysChartData } from "@/lib/chartUtils";

export const dynamic = "force-dynamic";

export const metadata = {
    title: "General Leads | Admin",
};

export default async function LeadsPage() {
    await connectDB();
    
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
    sevenDaysAgo.setHours(0, 0, 0, 0);

    const [records, recentLeadsForChart] = await Promise.all([
        Contact.find().sort({ createdAt: -1 }).lean(),
        Contact.find({ createdAt: { $gte: sevenDaysAgo } }).select('createdAt').lean()
    ]);

    const chartData = generateLast7DaysChartData(recentLeadsForChart, "count");

    const data = records.map(r => ({
        _id: r._id.toString(),
        name: r.name,
        email: r.email,
        subject: r.subject,
        message: r.message,
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
                title="Leads Overview" 
                description="General contact leads received over the last 7 days" 
                dataKey="count" 
                dataName="Leads" 
                color="#8b5cf6" 
            />
            <AdminDataTable 
                title="General Contact Leads" 
                data={data} 
                type="contact" 
            />
        </div>
    );
}
