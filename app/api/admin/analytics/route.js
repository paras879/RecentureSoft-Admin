import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import ProjectInquiry from "@/models/ProjectInquiry";
import MeetingRequest from "@/models/MeetingRequest";
import Contact from "@/models/Contact";

export async function GET(req) {
    try {
        await connectDB();
        
        const { searchParams } = new URL(req.url);
        const range = searchParams.get('range') || '7d'; // 7d, 30d, 1y
        
        const now = new Date();
        const pastDate = new Date();
        
        if (range === '7d') pastDate.setDate(now.getDate() - 6);
        else if (range === '30d') pastDate.setDate(now.getDate() - 29);
        else if (range === '1y') pastDate.setMonth(now.getMonth() - 11);
        
        pastDate.setHours(0, 0, 0, 0);

        const [projects, meetings, contacts] = await Promise.all([
            ProjectInquiry.find({ createdAt: { $gte: pastDate } }).select('createdAt').lean(),
            MeetingRequest.find({ createdAt: { $gte: pastDate } }).select('createdAt').lean(),
            Contact.find({ createdAt: { $gte: pastDate } }).select('createdAt').lean()
        ]);

        // Aggregate data by date
        const dataMap = new Map();
        
        // Initialize map with empty dates
        let currDate = new Date(pastDate);
        while (currDate <= now) {
            let key;
            if (range === '1y') {
                key = currDate.toLocaleString('default', { month: 'short', year: '2-digit' });
                currDate.setMonth(currDate.getMonth() + 1);
            } else {
                key = currDate.toLocaleString('default', { month: 'short', day: 'numeric' });
                currDate.setDate(currDate.getDate() + 1);
            }
            if (!dataMap.has(key)) dataMap.set(key, { name: key, projects: 0, meetings: 0, contacts: 0 });
        }

        const populateMap = (items, type) => {
            items.forEach(item => {
                const date = new Date(item.createdAt);
                let key = range === '1y' 
                    ? date.toLocaleString('default', { month: 'short', year: '2-digit' })
                    : date.toLocaleString('default', { month: 'short', day: 'numeric' });
                
                if (dataMap.has(key)) {
                    dataMap.get(key)[type]++;
                }
            });
        };

        populateMap(projects, 'projects');
        populateMap(meetings, 'meetings');
        populateMap(contacts, 'contacts');

        const chartData = Array.from(dataMap.values());

        return NextResponse.json({ success: true, chartData });
    } catch (e) {
        console.error("Analytics API Error", e);
        return NextResponse.json({ success: false, error: "Failed to fetch analytics" }, { status: 500 });
    }
}
