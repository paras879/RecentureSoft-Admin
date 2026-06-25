import { connectDB } from "@/lib/mongodb";
import MeetingRequest from "@/models/MeetingRequest";
import AdminDataTable from "@/components/admin/AdminDataTable";
import DashboardChart from "@/components/admin/DashboardChart";
import { generateLast7DaysChartData } from "@/lib/chartUtils";

export const dynamic = "force-dynamic";

export const metadata = {
    title: "Meeting Requests | Admin",
};

export default async function MeetingsPage() {
    await connectDB();
    
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
    sevenDaysAgo.setHours(0, 0, 0, 0);

    const [records, recentMeetingsForChart] = await Promise.all([
        MeetingRequest.find().sort({ createdAt: -1 }).lean(),
        MeetingRequest.find({ createdAt: { $gte: sevenDaysAgo } }).select('createdAt').lean()
    ]);

    const chartData = generateLast7DaysChartData(recentMeetingsForChart, "count");

    const data = records.map(r => ({
        _id: r._id.toString(),
        name: r.name,
        email: r.email,
        date: r.date,
        time: r.time,
        topic: r.topic,
        submittedAt: new Date(r.createdAt).toLocaleDateString("en-US", {
            year: 'numeric', month: 'short', day: 'numeric'
        }),
    }));

    return (
        <div className="pb-10 flex flex-col gap-6">
            <DashboardChart 
                data={chartData} 
                title="Meeting Requests" 
                description="Meeting requests scheduled over the last 7 days" 
                dataKey="count" 
                dataName="Meetings" 
                color="#10b981" 
            />
            <AdminDataTable 
                title="Meeting Requests" 
                data={data} 
                type="meeting" 
            />
        </div>
    );
}
